<script lang="ts">
	import type { ThemeColors } from "../types.js";

	let { themeColors }: { themeColors: ThemeColors } = $props();
</script>

{#if themeColors}
	<!-- default to dark mode for to allow testing -->
	<!-- this will be overwritten by FOUC prevention snippet below -->
	<!-- but that snippet does not run in vitest -->
	<meta name="theme-color" content={themeColors.dark} />
{/if}
