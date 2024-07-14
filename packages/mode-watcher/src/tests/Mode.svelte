<script lang="ts">
	import { ModeWatcher, toggleMode, setMode, resetMode, mode } from '$lib/index.js';

	export let track = true;
	export let darkClassNames: string[] = ['dark'];
</script>

<ModeWatcher {track} {darkClassNames} themeColors={{ dark: 'black', light: 'white' }} />
<span data-testid="mode">{$mode}</span>
<button on:click={toggleMode} data-testid="toggle"> toggle </button>
<button on:click={() => setMode('light')} data-testid="light">light</button>
<button on:click={() => setMode('dark')} data-testid="dark">dark</button>
<button on:click={() => resetMode()} data-testid="reset">reset</button>
