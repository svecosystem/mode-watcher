<script lang="ts">
	import {
		toggleMode,
		setMode,
		resetMode,
		userPrefersMode,
		systemPrefersMode,
		mode,
	} from '$lib/index.js';

	import { derived } from 'svelte/store';
	import { browser } from '$app/environment';

	const htmlElement = derived(mode, () => {
		if (browser) {
			const htmlElement = document.documentElement;
			if (htmlElement) {
				return htmlElement.outerHTML.replace(htmlElement.innerHTML + '</html>', '');
			}
		}
	});

	const themeColorElement = derived(mode, () => {
		if (browser) {
			const themeColorElement = document.querySelector('meta[name="theme-color"]');
			if (themeColorElement) {
				return themeColorElement.outerHTML;
			}
		}
	});
</script>

<div class="container py-12 space-y-4">
	<p>User prefers mode: {$userPrefersMode}</p>
	<p>System prefers mode: {$systemPrefersMode}</p>
	<p>Current mode: {$mode}</p>

	{#if $htmlElement !== undefined}
		<pre>{$htmlElement}</pre>
	{/if}
	{#if $themeColorElement !== undefined}
		<pre>{$themeColorElement}</pre>
	{/if}

	<button on:click={toggleMode}> Toggle </button>
	<button on:click={() => setMode('light')}> Light Mode </button>
	<button on:click={() => setMode('dark')}> Dark Mode </button>
	<button on:click={resetMode}> Reset </button>
</div>

<style lang="postcss">
	button {
		@apply bg-primary transition-colors text-background px-2 py-1 rounded-sm duration-500;
	}
</style>
