<svelte:options runes />

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

	let { track = true, ...restProps }: ModeWatcherProps = $props();
</script>

<ModeWatcher {track} {...restProps} themeColors={{ dark: "black", light: "white" }} />
<span data-testid="mode-storage-key">{modeStorageKey.current}</span>
<span data-testid="theme-storage-key">{themeStorageKey.current}</span>
<span data-testid="mode">{mode.current}</span>
<span data-testid="theme">{theme.current}</span>
<button onclick={toggleMode} data-testid="toggle"> toggle </button>
<button onclick={() => setMode("light")} data-testid="light">light</button>
<button onclick={() => setMode("dark")} data-testid="dark">dark</button>
<button onclick={() => resetMode()} data-testid="reset">reset</button>

<button onclick={() => setTheme("dracula")} data-testid="theme-dracula">dracula</button>
<button onclick={() => setTheme("retro")} data-testid="theme-retro">retro</button>
<button onclick={() => setTheme("")} data-testid="theme-clear">clear</button>
