<svelte:options runes />

<script lang="ts">
	import { ModeWatcher, resetMode, setMode, toggleMode } from "$lib/index.js";

	let { track = true }: { track?: boolean } = $props();
</script>

<ModeWatcher {track} themeColors={{ dark: "black", light: "white" }} />
<button onclick={toggleMode} data-testid="toggle"> toggle </button>
<button onclick={() => setMode("light")} data-testid="light">light</button>
<button onclick={() => setMode("dark")} data-testid="dark">dark</button>
<button onclick={() => resetMode()} data-testid="reset">reset</button>
