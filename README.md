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

The `ModeWatcher` component will automatically detect the user's preferences and apply/remove the `dark` class, along with the corresponding `color-scheme` style attribute to the `html` element.

`ModeWatcher` will automatically track operating system preferences and apply these if no user preference is set. If you wish to disable this behavior, set the `track` prop to `false`:

```svelte
<ModeWatcher track={false} />
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

A function that sets the current mode. It accepts a string with the value `light` or `dark`.

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

A readable store that contains the current mode. It can be `light` or `dark`.

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
