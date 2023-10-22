<script lang="ts">
	import { onMount } from 'svelte';
	import { getModeOsPrefers, setInitialClassState, setModeCurrent } from './mode.js';

	onMount(() => {
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
	});
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>
