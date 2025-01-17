<script lang="ts">
	import { run } from "svelte/legacy";

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

	import type { ModeWatcherProps } from "./types.js";
	import {
		darkClassNames as darkClassNamesStore,
		isValidMode,
		lightClassNames as lightClassNamesStore,
		modeStorageKey as modeStorageKeyStore,
		themeStorageKey as themeStorageKeyStore,
	} from "./stores.js";
	import ModeWatcherLite from "./mode-watcher-lite.svelte";
	import ModeWatcherFull from "./mode-watcher-full.svelte";

	const {
		track = true,
		defaultMode = "system",
		themeColors,
		disableTransitions = true,
		darkClassNames = ["dark"],
		lightClassNames = [],
		defaultTheme = "",
		nonce = "",
		themeStorageKey = "mode-watcher-theme",
		modeStorageKey = "mode-watcher-mode",
		disableHeadScriptInjection = false,
	}: ModeWatcherProps = $props();

	run(() => {
		disableTransitionsStore.set(disableTransitions);
	});
	run(() => {
		themeColorsStore.set(themeColors);
	});
	run(() => {
		darkClassNamesStore.set(darkClassNames);
	});
	run(() => {
		lightClassNamesStore.set(lightClassNames);
	});
	run(() => {
		modeStorageKeyStore.set(modeStorageKey);
	});
	run(() => {
		themeStorageKeyStore.set(themeStorageKey);
	});

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

	const trueNonce = $derived(typeof window === "undefined" ? nonce : "");
</script>

{#if disableHeadScriptInjection}
	<ModeWatcherLite {themeColors} />
{:else}
	<ModeWatcherFull {trueNonce} {initConfig} {themeColors} />
{/if}
