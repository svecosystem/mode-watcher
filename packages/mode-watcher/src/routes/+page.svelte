<script lang="ts">
	import { derived } from "svelte/store";
	import {
		mode,
		resetMode,
		setMode,
		systemPrefersMode,
		toggleMode,
		userPrefersMode,
	} from "$lib/index.js";

	import { browser } from "$app/environment";

	const htmlElement = derived(mode, () => {
		if (!browser) return;
		const htmlElement = document.documentElement;
		if (htmlElement) {
			return htmlElement.outerHTML.replace(`${htmlElement.innerHTML}</html>`, "");
		}
	});

	const themeColorElement = derived(mode, () => {
		if (!browser) return;
		const themeColorElement = document.querySelector('meta[name="theme-color"]');
		if (themeColorElement) {
			return themeColorElement.outerHTML;
		}
	});
</script>

<div class="container space-y-4 py-12">
	<p>User prefers mode: {$userPrefersMode}</p>
	<p>System prefers mode: {$systemPrefersMode}</p>
	<p>Current mode: {$mode}</p>

	{#if $htmlElement !== undefined}
		<pre>{$htmlElement}</pre>
	{/if}
	{#if $themeColorElement !== undefined}
		<pre>{$themeColorElement}</pre>
	{/if}

	<button onclick={toggleMode}> Toggle </button>
	<button onclick={() => setMode("light")}> Light Mode </button>
	<button onclick={() => setMode("dark")}> Dark Mode </button>
	<button onclick={resetMode}> Reset </button>
</div>

<style lang="postcss">
	button {
		@apply bg-primary text-background rounded-sm px-2 py-1 transition-colors duration-500;
	}
</style>
