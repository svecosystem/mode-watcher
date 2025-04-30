---
title: createInitialModeExpression
description: Creates a secure inline script to set the initial mode (light, dark, or system) before hydration.
section: Utilities
---

<script>
	import { Callout } from '@svecodocs/kit'
</script>

`createInitialModeExpression` outputs a small, inline JavaScript snippet as a string.

It's typically used alongside server-rendered HTML and injected into the page head securely using SvelteKit's `transformPageChunk`.

## When to Use

Use `createInitialModeExpression` when:

- You're operating under a Content Security Policy (CSP) that requires a `nonce` for inline scripts.
- You're rendering the initial page via SvelteKit server hooks and want to inject logic at render time.

This approach is ideal for security-sensitive environments or platforms with strict CSP headers, where inline scripts must include a trusted nonce.

## Usage

To use `createInitialModeExpression`, you need two things:

### 1. Modify `app.html`

Add the following placeholder in the `<head>` of your `app.html` file:

```html title="app.html"
<script nonce="%sveltekit.nonce%">
	%modewatcher.snippet%
</script>
```

This placeholder will be replaced server-side at render time.

### 2. Update `hooks.server.ts`

Inject the snippet during SSR using `transformPageChunk`:

```ts title="hooks.server.ts"
import { createInitialModeExpression } from "mode-watcher";

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace("%modewatcher.snippet%", createInitialModeExpression()),
	});
};
```

<Callout type="tip">

If you're planning to inject multiple types of initial client-side logic (e.g., directionality, locale), consider using a shared `%placeholder%` strategy with `transformPageChunk`.

</Callout>

## Credits

Thanks to [@fnimick](https://github.com/fnimick) for contributing and validating this approach.
