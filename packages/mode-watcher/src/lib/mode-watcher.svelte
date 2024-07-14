<script lang="ts">
	import { onMount } from 'svelte';
	import {
		systemPrefersMode,
		setMode,
		localStorageKey,
		mode,
		themeColors as themeColorsStore,
		disableTransitions as disableTransitionsStore,
		setInitialMode,
	} from './mode.js';

	import type { Mode, ModeWatcherProps, ThemeColors } from './types.js';
	import {
		darkClassNames as darkClassNamesStore,
		isValidMode,
		lightClassNames as lightClassNamesStore,
	} from './stores.js';

	type $$Props = ModeWatcherProps;

	export let track = true;
	export let defaultMode: Mode = 'system';
	export let themeColors: ThemeColors = undefined;
	export let disableTransitions = true;
	export let darkClassNames: string[] = ['dark'];
	export let lightClassNames: string[] = [];

	themeColorsStore.set(themeColors);
	disableTransitionsStore.set(disableTransitions);
	darkClassNamesStore.set(darkClassNames);
	lightClassNamesStore.set(lightClassNames);

	$: disableTransitionsStore.set(disableTransitions);
	$: themeColorsStore.set(themeColors);
	$: darkClassNamesStore.set(darkClassNames);
	$: lightClassNamesStore.set(lightClassNames);

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

	const args = `"${defaultMode}"${
		themeColors ? `, ${JSON.stringify(themeColors)}` : ', undefined'
	}, ${JSON.stringify(darkClassNames)}, ${JSON.stringify(lightClassNames)}`;
</script>

<svelte:head>
	{#if themeColors}
		<!-- default to dark mode for to allow testing -->
		<!-- this will be overwritten by FOUC prevention snippet below -->
		<!-- but that snippet does not run in vitest -->
		<meta name="theme-color" content={themeColors.dark} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script nonce="%sveltekit.nonce%">(` +
		setInitialMode.toString() +
		`)(` +
		args +
		`);</script>`}
</svelte:head>
