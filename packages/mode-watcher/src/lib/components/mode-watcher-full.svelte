<script lang="ts">
	import { createInitialModeExpression } from "../mode.js";
	import type { ThemeColors } from "../types.js";

	let {
		trueNonce = "",
		initConfig,
		themeColors,
	}: {
		trueNonce: string;
		initConfig: NonNullable<Parameters<typeof createInitialModeExpression>[0]>;
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags, svelte/no-unused-svelte-ignore --><!-- svelte-ignore hydration_html_changed -->
	{@html `<script${trueNonce ? ` nonce=${trueNonce}` : ""}>${createInitialModeExpression(initConfig)}</script>`}
</svelte:head>
