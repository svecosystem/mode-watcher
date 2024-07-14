<script lang="ts">
	import {
		ModeWatcher,
		toggleMode,
		setMode,
		resetMode,
		mode,
		theme,
		modeStorageKey,
		themeStorageKey,
		setTheme,
	} from "$lib/index.js";
	import type { ModeWatcherProps } from "$lib/types.js";

	type $$Props = ModeWatcherProps;

	export let track = true;
</script>

<ModeWatcher {track} {...$$restProps} themeColors={{ dark: "black", light: "white" }} />
<span data-testid="mode-storage-key">{$modeStorageKey}</span>
<span data-testid="theme-storage-key">{$themeStorageKey}</span>
<span data-testid="mode">{$mode}</span>
<span data-testid="theme">{$theme}</span>
<button on:click={toggleMode} data-testid="toggle"> toggle </button>
<button on:click={() => setMode("light")} data-testid="light">light</button>
<button on:click={() => setMode("dark")} data-testid="dark">dark</button>
<button on:click={() => resetMode()} data-testid="reset">reset</button>

<button on:click={() => setTheme("dracula")} data-testid="theme-dracula">dracula</button>
<button on:click={() => setTheme("retro")} data-testid="theme-retro">retro</button>
<button on:click={() => setTheme("")} data-testid="theme-clear">clear</button>
