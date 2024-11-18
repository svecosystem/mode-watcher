<script lang="ts">
	import { onMount } from "svelte";
	import {
		defineConfig,
		disableTransitions as disableTransitionsStore,
		mode,
		setInitialMode,
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

<svelte:head>
	{#if themeColors}
		<!-- default to dark mode for to allow testing -->
		<!-- this will be overwritten by FOUC prevention snippet below -->
		<!-- but that snippet does not run in vitest -->
		<meta name="theme-color" content={themeColors.dark} />
	{/if}

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script${trueNonce ? ` nonce=${trueNonce}` : ''}>(` +
		setInitialMode.toString() +
		`)(` +
		JSON.stringify(initConfig) +
		`);</script>`}
</svelte:head>
