# Mode Watcher

Simple utilities to manage light & dark mode in your SvelteKit app.

## Installation

```bash
npm install mode-watcher
```

## Usage

Inside your SvelteKit app, import the `ModeWatcher` component and use it in your root layout:

```svelte
<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />
<slot />
```

The `ModeWatcher` component will automatically detect the user's preferences and apply/remove the `dark` class to the `html` element.

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
