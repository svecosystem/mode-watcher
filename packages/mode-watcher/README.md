# Mode Watcher

Simple utilities to manage light & dark mode in your SvelteKit app.

<!-- automd:badges license name="mode-watcher" color="yellow" github="svecosystem/mode-watcher" -->

[![npm version](https://flat.badgen.net/npm/v/mode-watcher?color=yellow)](https://npmjs.com/package/mode-watcher)
[![npm downloads](https://flat.badgen.net/npm/dm/mode-watcher?color=yellow)](https://npmjs.com/package/mode-watcher)
[![license](https://flat.badgen.net/github/license/svecosystem/mode-watcher?color=yellow)](https://github.com/svecosystem/mode-watcher/blob/main/LICENSE)

<!-- /automd -->

[![](https://dcbadge.vercel.app/api/server/fdXy3Sk8Gq?style=flat)](https://discord.gg/fdXy3Sk8Gq)

## Installation

```bash
npm install mode-watcher
```

## Usage

Add the `ModeWatcher` component to your root `+layout.svelte` file.

```svelte
<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<ModeWatcher />
{@render children()}
```

The `ModeWatcher` component will automatically detect the user's preferences and apply/remove the `"dark"` class, along with the corresponding `color-scheme` style attribute to the `html` element.

`ModeWatcher` will automatically track operating system preferences and apply these if no user preference is set. If you wish to disable this behavior, set the `track` prop to `false`:

```svelte
<ModeWatcher track={false} />
```

`ModeWatcher` can also be configured with a default mode instead of automatically detecting the user's preference.

To set a default mode, use the `defaultMode` prop:

```svelte
<ModeWatcher defaultMode={"dark"}>
```

`ModeWatcher` can manage the `theme-color` meta tag for you.

To enable this, set the `themeColors` prop to your preferred colors:

```svelte
<ModeWatcher themeColors={{ dark: "black", light: "white" }}>
```

## API

### toggleMode

A function that toggles the current mode.

```svelte
<script lang="ts">
	import { toggleMode } from "mode-watcher";
</script>

<button onclick={toggleMode}>Toggle Mode</button>
```

### setMode

A function that sets the current mode. It accepts a string with the value `"light"`, `"dark"` or `"system"`.

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button onclick={() => setMode("light")}>Set Light Mode</button>
<button onclick={() => setMode("dark")}>Set Dark Mode</button>
```

### resetMode

A function that resets the mode to system preferences.

```svelte
<script lang="ts">
	import { resetMode } from "mode-watcher";
</script>

<button onclick={resetMode}>System</button>
```

### mode

A readable store that contains the current mode. It can be `"light"` or `"dark"` or `undefined` if evaluated on the server.

```svelte
<script lang="ts">
	import { setMode, mode } from "mode-watcher";

	function handleModeChange() {
		if (mode.current === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	}
</script>

<button onclick={handleModeChange}>{mode.current}</button>
```

### userPrefersMode

A writeable store that represents the user's mode preference. It can be `"light"`, `"dark"` or `"system"`.

### systemPrefersMode

A readable store that represents the operating system's mode preference. It can be `"light"`, `"dark"` or `undefined` if evaluated on the server. Will automatically track changes to the operating system's mode preference unless this is disabled with the `tracking()` method which takes a boolean. Normally this is disabled by setting the `track` prop to false in the `<ModeWatcher>` component.

## Demo / Reproduction Template

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/svecosystem/mode-watcher-reproduction)

## Sponsors

This project is supported by the following beautiful people/organizations:

<p align="center">
  <a href="https://github.com/sponsors/huntabyte">
    <img src='https://github.com/huntabyte/static/blob/main/sponsors.svg?raw=true' alt="Logos from Sponsors" />
  </a>
</p>

## License

<!-- automd:contributors license=MIT author="huntabyte" github="svecosystem/mode-watcher" -->

Published under the [MIT](https://github.com/svecosystem/mode-watcher/blob/main/LICENSE) license.
Made by [@huntabyte](https://github.com/huntabyte), [@ollema](https://github.com/ollema), and [community](https://github.com/svecosystem/mode-watcher/graphs/contributors) 💛
<br><br>
<a href="https://github.com/svecosystem/mode-watcher/graphs/contributors">
<img src="https://contrib.rocks/image?repo=svecosystem/mode-watcher" />
</a>

<!-- /automd -->

## Community

Join the Discord server to ask questions, find collaborators, or just say hi!

<a href="https://discord.gg/fdXy3Sk8Gq" alt="Svecosystem Discord community">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://invidget.switchblade.xyz/fdXy3Sk8Gq">
  <img alt="Svecosystem Discord community" src="https://invidget.switchblade.xyz/fdXy3Sk8Gq?theme=light">
</picture>
</a>
