<script lang="ts">
	import { ModeWatcher, toggleMode, setMode, resetMode, mode } from '$lib';
</script>

<ModeWatcher />
<span data-testid="mode">{$mode}</span>
<button on:click={toggleMode} data-testid="toggle"> toggle </button>
<button on:click={() => setMode('light')} data-testid="light">light</button>
<button on:click={() => setMode('dark')} data-testid="dark">dark</button>
<button on:click={() => resetMode()} data-testid="reset">reset</button>
