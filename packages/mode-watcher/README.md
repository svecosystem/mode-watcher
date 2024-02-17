# Mode Watcher

Simple utilities to manage light & dark mode in your SvelteKit app.

## Installation

```bash
npm install mode-watcher
```

## Usage

Add the `ModeWatcher` component to your root `+layout.svelte` file.

```svelte
<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<slot />
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
	import { toggleMode } from 'mode-watcher';
</script>

<button on:click={toggleMode}>Toggle Mode</button>
```

### setMode

A function that sets the current mode. It accepts a string with the value `"light"`, `"dark"` or `"system"`.

```svelte
<script lang="ts">
	import { setMode } from 'mode-watcher';
</script>

<button on:click={() => setMode('light')}>Set Light Mode</button>
<button on:click={() => setMode('dark')}>Set Dark Mode</button>
```

### resetMode

A function that resets the mode to system preferences.

```svelte
<script lang="ts">
	import { resetMode } from 'mode-watcher';
</script>

<button on:click={() => resetMode()}>System</button>
```

### mode

A readable store that contains the current mode. It can be `"light"` or `"dark"` or `undefined` if evaluated on the server.

```svelte
<script lang="ts">
	import { setMode, mode } from 'mode-watcher';

	function handleModeChange() {
		if ($mode === 'light') {
			setMode('dark');
		} else {
			setMode('light');
		}
	}
</script>

<button on:click={handleModeChange}>{$mode}</button>
```

### userPrefersMode

A writeable store that represents the user's mode preference. It can be `"light"`, `"dark"` or `"system"`.

### systemPrefersMode

A readable store that represents the operating system's mode preference. It can be `"light"`, `"dark"` or `undefined` if evaluated on the server. Will automatically track changes to the operating system's mode preference unless this is disabled with the `tracking()` method which takes a boolean. Normally this is disabled by setting the `track` prop to false in the `<ModeWatcher>` component.

## Demo / Reproduction Template

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/huntabyte/mode-watcher)
