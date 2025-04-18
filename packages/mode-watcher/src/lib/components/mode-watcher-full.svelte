<script lang="ts">
	import setInitialMode from "../set-initial-mode.js?raw";
	import type { SetInitialModeArgs } from "../mode.js";
	import type { ThemeColors } from "../types.js";

	let {
		trueNonce = "",
		initConfig,
		themeColors,
	}: {
		trueNonce: string;
		initConfig: SetInitialModeArgs;
		themeColors: ThemeColors;
	} = $props();
</script>

<svelte:head>
	{#if themeColors}
		<!-- default to dark mode for to allow testing -->
		<!-- this will be overwritten by FOUC prevention snippet below -->
		<!-- but that snippet does not run in vitest -->
		<meta name="theme-color" content={themeColors.dark} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags, prefer-template, svelte/no-unused-svelte-ignore -->
	{@html `<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` +
		setInitialMode +
		`)(` +
		JSON.stringify(initConfig) +
		`);</script>`}
</svelte:head>
