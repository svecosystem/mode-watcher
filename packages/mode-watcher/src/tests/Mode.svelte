<script lang="ts">
	import {
		ModeWatcher,
		mode,
		modeStorageKey,
		resetMode,
		setMode,
		setTheme,
		theme,
		themeStorageKey,
		toggleMode,
	} from "$lib/index.js";
	import type { ModeWatcherProps } from "$lib/types.js";

	const { track = true, ...rest }: ModeWatcherProps = $props();
</script>

<ModeWatcher {track} {...rest} themeColors={{ dark: "black", light: "white" }} />
<span data-testid="mode-storage-key">{$modeStorageKey}</span>
<span data-testid="theme-storage-key">{$themeStorageKey}</span>
<span data-testid="mode">{$mode}</span>
<span data-testid="theme">{$theme}</span>
<button onclick={toggleMode} data-testid="toggle"> toggle </button>
<button onclick={() => setMode("light")} data-testid="light">light</button>
<button onclick={() => setMode("dark")} data-testid="dark">dark</button>
<button onclick={() => resetMode()} data-testid="reset">reset</button>

<button onclick={() => setTheme("dracula")} data-testid="theme-dracula">dracula</button>
<button onclick={() => setTheme("retro")} data-testid="theme-retro">retro</button>
<button onclick={() => setTheme("")} data-testid="theme-clear">clear</button>
