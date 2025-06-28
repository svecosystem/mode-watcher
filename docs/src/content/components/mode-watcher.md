---
title: ModeWatcher
description: API Reference for the ModeWatcher component.
section: Components
---

<script>
	import { Callout, PropField, Collapsible } from '@svecodocs/kit'
</script>

## Usage

Add the `ModeWatcher` component to your root `+layout.svelte` file to automatically apply mode and theme preferences:

```svelte title="src/routes/+layout.svelte"
<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
```

`ModeWatcher` will:

- Detect user mode preferences (`light`, `dark`, or `system`)
- Apply the appropriate class (dark by default) to the `<html>` element
- Set the `color-scheme` attribute accordingly
- Optionally apply a theme via the `data-theme` attribute

## Features

### Disable Tracking

`ModeWatcher` will automatically track operating system preferences and apply these if no user preference is set. If you wish to disable this behavior, set the track prop to `false`:

```svelte
<ModeWatcher track={false} />
```

### Default Mode

Use the `defaultMode` prop to specify a fallback when no user preference is available:

```svelte
<ModeWatcher defaultMode="dark" />
```

### Themes

In addition to the `dark`, `light`, and `system` modes, `ModeWatcher` can also be configured with a theme which will be applied to the root `html` element like so:

```html
<html data-theme="your-custom-theme"></html>
```

### Theme Colors

Manage the browser's `<meta name="theme-color">` dynamically based on mode:

```svelte
<ModeWatcher themeColors={{ dark: "#000", light: "#fff" }} />
```

### Custom Class Names

Customize the class names added to `<html>` when switching modes:

```svelte
<ModeWatcher darkClassNames={["dddd"]} lightClassNames={["fff"]} />
```

Now, when the mode is dark, the root `html` element will have the `dddd` class, and when the mode is light, the root `html` element will have the `fff` class.

### Custom Local Storage Keys

Override the default `localStorage` keys:

```svelte
<ModeWatcher modeStorageKey="my-mode-key" themeStorageKey="my-theme-key" />
```

### CSP Nonce Support

Provide a nonce if using a strict Content Security Policy.

This will be applied to the injected `<script>` tag used for pre-hydration mode setting:

```svelte
<ModeWatcher nonce="my-secure-nonce" />
```

### Disable Script Injection

Prevent `ModeWatcher` from injecting the initial head script by setting:

```svelte
<ModeWatcher disableHeadScriptInjection={true} />
```

## Props

The `ModeWatcher` component accepts the following props:

<PropField name="track" type="boolean" defaultValue="true">
	Whether to automatically track operating system preferences and update the mode accordingly.
</PropField>
<PropField name="defaultMode" type="'system' | 'light' | 'dark'" defaultValue="'system'">
	The default mode to use instead of the user's preference.
</PropField>
<PropField name="defaultTheme" type="string">

The default theme to use, which will be applied to the root `html` element and can be managed with the `setTheme` function.

</PropField>
<PropField name="themeColors" type="ThemeColors">
The theme colors to use for each mode.
<Collapsible title="properties">
	<PropField name="dark" type="string" required>
		The color to use for dark mode.
	</PropField>
	<PropField name="light" type="string" required>
		The color to use for light mode.
	</PropField>
</Collapsible>
</PropField>
<PropField name="disableTransitions" type="boolean" defaultValue="false">
	Whether to disable transitions when updating the mode.
</PropField>
<PropField name="darkClassNames" type="string[]" defaultValue="['dark']">

The classes to add to the root `html` element when the mode is `'dark'`.

</PropField>
<PropField name="lightClassNames" type="string[]" defaultValue="[]">

The classes to add to the root `html` element when the mode is `'light'`.

</PropField>
<PropField name="modeStorageKey" type="string" defaultValue="'mode-watcher-mode'">
	Optionally provide a custom local storage key to use for storing the mode.
</PropField>

<PropField name="themeStorageKey" type="string" defaultValue="'mode-watcher-theme'">
	Optionally provide a custom local storage key to use for storing the theme.
</PropField>

<PropField name="nonce" type="string">
	An optional nonce to use for the injected script tag to allow-list mode-watcher if you are using a Content Security Policy.
</PropField>

<PropField name="disableHeadScriptInjection" type="boolean" defaultValue="false">
	Whether to disable the injected script tag that sets the initial mode. Set this if you are manually injecting the script using a hook.
</PropField>

<PropField name="synchronousModeChanges" type="boolean" defaultValue="false">

Whether to run the mode changes synchronously instead of using an animation frame. If true, will have an impact on blocking performance due to blocking the main thread.

Only applicable if `disableTransitions` is set to `true`.

</PropField>
