<script lang="ts">
	import type { ThemeColors } from "./types.js";

	export let themeColors: ThemeColors = undefined;
</script>

{#if themeColors}
	<!-- default to dark mode for to allow testing -->
	<!-- this will be overwritten by FOUC prevention snippet below -->
	<!-- but that snippet does not run in vitest -->
	<meta name="theme-color" content={themeColors.dark} />
{/if}
