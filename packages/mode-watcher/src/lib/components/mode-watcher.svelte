<script lang="ts">
	import { onMount } from "svelte";
	import {
		defineConfig,
		disableTransitions as disableTransitionsStore,
		mode,
		setMode,
		setTheme,
		systemPrefersMode,
		theme,
		themeColors as themeColorsStore,
	} from "./mode.js";

	import type { Mode, ModeWatcherProps, ThemeColors } from "./types.js";
	import {
		darkClassNames as darkClassNamesStore,
		isValidMode,
		lightClassNames as lightClassNamesStore,
		modeStorageKey as modeStorageKeyStore,
		themeStorageKey as themeStorageKeyStore,
	} from "./stores.js";
	import ModeWatcherLite from "./mode-watcher-lite.svelte";
	import ModeWatcherFull from "./mode-watcher-full.svelte";

	type $$Props = ModeWatcherProps;

	export let track = true;
	export let defaultMode: Mode = "system";
	export let themeColors: ThemeColors = undefined;
	export let disableTransitions = true;
	export let darkClassNames: string[] = ["dark"];
	export let lightClassNames: string[] = [];
	export let defaultTheme: string = "";
	export let nonce: string = "";
	export let themeStorageKey: string = "mode-watcher-theme";
	export let modeStorageKey: string = "mode-watcher-mode";
	export let disableHeadScriptInjection = false;

	$: disableTransitionsStore.set(disableTransitions);
	$: themeColorsStore.set(themeColors);
	$: darkClassNamesStore.set(darkClassNames);
	$: lightClassNamesStore.set(lightClassNames);
	$: modeStorageKeyStore.set(modeStorageKey);
	$: themeStorageKeyStore.set(themeStorageKey);

	onMount(() => {
		const modeUnsubscribe = mode.subscribe(() => {});
		const themeUnsubscribe = theme.subscribe(() => {});
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		const localStorageMode = localStorage.getItem($modeStorageKeyStore);
		setMode(isValidMode(localStorageMode) ? localStorageMode : defaultMode);
		const localStorageTheme = localStorage.getItem($themeStorageKeyStore);
		setTheme(localStorageTheme || defaultTheme);

		return () => {
			modeUnsubscribe();
			themeUnsubscribe();
		};
	});

	const initConfig = defineConfig({
		defaultMode,
		themeColors,
		darkClassNames,
		lightClassNames,
		defaultTheme,
		modeStorageKey,
		themeStorageKey,
	});

	$: trueNonce = typeof window === "undefined" ? nonce : "";
</script>

{#if disableHeadScriptInjection}
	<ModeWatcherLite {themeColors} />
{:else}
	<ModeWatcherFull {trueNonce} {initConfig} {themeColors} />
{/if}
