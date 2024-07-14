<script lang="ts">
	import { onMount } from "svelte";
	import {
		disableTransitions as disableTransitionsStore,
		localStorageKey,
		mode,
		setInitialMode,
		setMode,
		systemPrefersMode,
		themeColors as themeColorsStore,
	} from "./mode.js";

	import type { Mode, ModeWatcherProps, ThemeColors } from "./types.js";
	import { isValidMode } from "./stores.js";

	type $$Props = ModeWatcherProps;

	export let track = true;
	export let defaultMode: Mode = "system";
	export let themeColors: ThemeColors = undefined;
	export let disableTransitions = true;

	themeColorsStore.set(themeColors);
	disableTransitionsStore.set(disableTransitions);

	onMount(() => {
		const unsubscriber = mode.subscribe(() => {});
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		const localStorageMode = localStorage.getItem(localStorageKey);
		setMode(isValidMode(localStorageMode) ? localStorageMode : defaultMode);

		return () => {
			unsubscriber();
		};
	});

	const args = `"${defaultMode}"${themeColors ? `, ${JSON.stringify(themeColors)}` : ""}`;
</script>

<svelte:head>
	{#if themeColors}
		<!-- default to dark mode for to allow testing -->
		<!-- this will be overwritten by FOUC prevention snippet below -->
		<!-- but that snippet does not run in vitest -->
		<meta name="theme-color" content={themeColors.dark} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags prefer-template -->
	{@html `<script nonce="%sveltekit.nonce%">(` +
		setInitialMode.toString() +
		`)(` +
		args +
		`);</script>`}
</svelte:head>
