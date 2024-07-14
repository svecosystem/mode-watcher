---
title: <ModeWatcher />
description: API Reference for the ModeWatcher component.
tagline: API Reference
---

<script>
	import { Callout } from '$lib/components'
</script>

## Usage

Add the `ModeWatcher` component to your root `+layout.svelte` component.

```svelte title="src/routes/+layout.svelte"
<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />
```

The `ModeWatcher` component will automatically detect the user's preferences and apply/remove the "dark" class, along with the corresponding color-scheme style attribute to the html element.

### Disable Tracking

`ModeWatcher` will automatically track operating system preferences and apply these if no user preference is set. If you wish to disable this behavior, set the track prop to false:

```svelte
<ModeWatcher track={false} />
```

### Default Mode

`ModeWatcher` can be configured with a default mode instead of automatically detecting the user's preference.

To set a default mode, use the `defaultMode` prop:

```svelte
<ModeWatcher defaultMode="dark" />
```

### Theme Colors

`ModeWatcher` can manage the theme-color meta tag for you.

To enable this, set the `themeColors` prop to your preferred colors:

```svelte
<ModeWatcher themeColors={{ dark: "#000", light: "#fff" }} />
```

### Custom Class Names

By default, `ModeWatcher` will add the `dark` class to the root `html` element when the mode is dark, and remove it when the mode is light. You can customize this behavior by passing an array of classNames to the `darkClassNames` and/or `lightClassNames` props:

```svelte
<ModeWatcher darkClassNames={["dddd"]} lightClassNames={["fff"]} />
```

Now, when the mode is dark, the root `html` element will have the `dddd` class, and when the mode is light, the root `html` element will have the `fff` class.

## Props

The `ModeWatcher` component accepts the following props:

```ts
export type Mode = "system" | "dark" | "light";
export type ThemeColors = { dark: string; light: string };

export type ModeWatcherProps = {
	/**
	 * Whether to automatically track operating system preferences
	 * and update the mode accordingly.
	 *
	 * @defaultValue `true`
	 */
	track?: boolean;

	/**
	 * The default mode to use instead of the user's preference.
	 *
	 * @defaultValue `"system"`
	 */
	defaultMode?: Mode;

	/**
	 * The theme colors to use for each mode.
	 *
	 * @defaultValue `undefined`
	 */
	themeColors?: ThemeColors;

	/**
	 * Whether to disable transitions when the mode changes.
	 *
	 * @defaultValue `true`
	 */
	disableTransitions?: boolean;

	/**
	 * The classname to add to the root `html` element when the mode is dark.
	 *
	 * @defaultValue `["dark"]`
	 */
	darkClassNames?: string[];

	/**
	 * The classname to add to the root `html` element when the mode is light.
	 *
	 * @defaultValue `[]`
	 */
	lightClassNames?: string[];
};
```
