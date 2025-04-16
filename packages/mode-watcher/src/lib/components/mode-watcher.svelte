<script lang="ts">
	import { onMount } from "svelte";
	import ModeWatcherLite from "./mode-watcher-lite.svelte";
	import ModeWatcherFull from "./mode-watcher-full.svelte";
	import {
		darkClassNames,
		disableTransitions,
		lightClassNames,
		modeStorageKey,
		systemPrefersMode,
		themeColors,
		themeStorageKey,
	} from "$lib/states.svelte.js";
	import type { ModeWatcherProps } from "$lib/types.js";
	import { isValidMode } from "$lib/modes.js";
	import { defineConfig, setMode, setTheme } from "$lib/mode.js";

	let {
		track = true,
		defaultMode = "system",
		themeColors: themeColorsProp,
		disableTransitions: disableTransitionsProp = true,
		darkClassNames: darkClassNamesProp = ["dark"],
		lightClassNames: lightClassNamesProp = [],
		defaultTheme = "",
		nonce = "",
		themeStorageKey: themeStorageKeyProp = "mode-watcher-theme",
		modeStorageKey: modeStorageKeyProp = "mode-watcher-mode",
		disableHeadScriptInjection = false,
	}: ModeWatcherProps = $props();

	$effect.pre(() => {
		disableTransitions.current = disableTransitionsProp;
	});

	$effect.pre(() => {
		themeColors.current = themeColorsProp;
	});

	$effect.pre(() => {
		darkClassNames.current = darkClassNamesProp;
	});

	$effect.pre(() => {
		lightClassNames.current = lightClassNamesProp;
	});

	$effect.pre(() => {
		modeStorageKey.current = modeStorageKeyProp;
	});

	$effect.pre(() => {
		themeStorageKey.current = themeStorageKeyProp;
	});

	onMount(() => {
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		const localStorageMode = localStorage.getItem(modeStorageKey.current);
		setMode(isValidMode(localStorageMode) ? localStorageMode : defaultMode);
		const localStorageTheme = localStorage.getItem(themeStorageKey.current);
		setTheme(localStorageTheme || defaultTheme);
	});

	const initConfig = defineConfig({
		defaultMode,
		themeColors: themeColorsProp,
		darkClassNames: darkClassNamesProp,
		lightClassNames: lightClassNamesProp,
		defaultTheme,
		modeStorageKey: modeStorageKeyProp,
		themeStorageKey: themeStorageKeyProp,
	});

	const trueNonce = $derived(typeof window === "undefined" ? nonce : "");
</script>

{#if disableHeadScriptInjection}
	<ModeWatcherLite themeColors={themeColors.current} />
{:else}
	<ModeWatcherFull {trueNonce} {initConfig} themeColors={themeColors.current} />
{/if}
