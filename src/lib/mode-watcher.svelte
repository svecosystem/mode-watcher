<script lang="ts">
	import { onMount } from 'svelte';
	import { getSystemPrefersMode, setInitialClassState, setActiveMode } from './mode.js';

	onMount(() => {
		if (!('mode' in localStorage)) {
			setActiveMode(getSystemPrefersMode());
		}
	});
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>
