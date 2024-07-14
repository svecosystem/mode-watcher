<script lang="ts">
	import { ModeWatcher, resetMode, setMode, toggleMode } from "$lib/index.js";

	export let track = true;
</script>

<ModeWatcher {track} themeColors={{ dark: "black", light: "white" }} />
<button on:click={toggleMode} data-testid="toggle"> toggle </button>
<button on:click={() => setMode("light")} data-testid="light">light</button>
<button on:click={() => setMode("dark")} data-testid="dark">dark</button>
<button on:click={() => resetMode()} data-testid="reset">reset</button>
