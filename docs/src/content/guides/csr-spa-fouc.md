---
title: CSR/SPA FOUC Prevention
description: Prevent flash of unstyled content in client-side rendered applications.
section: Guides
---

<script>
	import { Callout } from '@svecodocs/kit'
</script>

If you're using mode-watcher in a client-side rendered application (SvelteKit with `ssr: false`, Vite SPA, or any static site), you may experience a flash of unstyled content (FOUC) before mode-watcher hydrates.

## Why This Happens

In CSR apps, JavaScript executes after the initial HTML renders. The browser shows unstyled content (usually light mode) until mode-watcher reads localStorage and applies the theme.

This differs from SSR apps where the server can inject the correct theme before the page reaches the browser.

## Solution

Add this script to your `<head>` **before** any stylesheets:

```html
<script>
	const mode = localStorage.getItem("mode-watcher-mode") ?? "system";
	const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
	const isDark = mode === "dark" || (mode === "system" && prefersDark);
	document.documentElement.classList.toggle("dark", isDark);
	document.documentElement.style.colorScheme = isDark ? "dark" : "light";
</script>
```

This script:

- Runs synchronously before first paint
- Reads the same localStorage key mode-watcher uses
- Handles `light`, `dark`, and `system` modes
- Sets both the `dark` class and `color-scheme` property

## Customizing the Default

Change the fallback value if your app defaults to a specific theme:

```javascript
// Default to dark mode for new users
const mode = localStorage.getItem("mode-watcher-mode") ?? "dark";
```

## Why Not CSS-Only?

A CSS-only approach using `@media (prefers-color-scheme: dark)` only respects the OS preference, not the user's stored choice.

**Failure case:**

1. User's OS is set to light mode
2. User explicitly chooses dark mode in your app (stored in localStorage)
3. On reload: CSS sees "light" OS preference, shows light background
4. mode-watcher hydrates, reads "dark" from localStorage, switches to dark
5. User sees a light-to-dark flash

The JavaScript approach reads localStorage directly, respecting the user's explicit choice.

## SvelteKit with adapter-static

For SvelteKit apps using `adapter-static` with `ssr: false`:

### 1. Add the script to `src/app.html`

```html title="src/app.html"
<!doctype html>
<html lang="en">
	<head>
		<script>
			const mode = localStorage.getItem("mode-watcher-mode") ?? "system";
			const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
			const isDark = mode === "dark" || (mode === "system" && prefersDark);
			document.documentElement.classList.toggle("dark", isDark);
			document.documentElement.style.colorScheme = isDark ? "dark" : "light";
		</script>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

### 2. Common Pitfalls

<Callout type="warning">
**Do not** use `nonce="%sveltekit.nonce%"` with prerendered pages. The placeholder isn't replaced during prerendering and will cause CSP failures.
</Callout>

<Callout type="warning">
**Do not** use `hooks.server.ts` for script injection. Server hooks don't run for prerendered pages; they only execute during SSR.
</Callout>

## SSR Applications

If you're using SSR and need CSP compliance, see the [`createInitialModeExpression`](/docs/utilities/create-initial-mode-expression) utility instead. It's designed for server-rendered apps where `hooks.server.ts` runs on each request.

## References

- [SvelteKit CSP nonce limitations with prerendering](https://github.com/sveltejs/kit/issues/13307)
- [Real-world implementation in Epicenter](https://github.com/EpicenterHQ/epicenter/pull/1168)
