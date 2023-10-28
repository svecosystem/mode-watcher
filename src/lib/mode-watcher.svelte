<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getSystemPrefersMode,
		getUserPrefersMode,
		setActiveMode,
		setInitialClassState
	} from './mode';

	// track `prefers-color-scheme` if no user preference is set
	export let track = true;

	onMount(() => {
		if (!('mode' in localStorage)) {
			setActiveMode(getSystemPrefersMode());
		}

		if (!track) {
			return;
		}

		const mql = window.matchMedia('(prefers-color-scheme: light)');

		const listener = () => {
			if (getUserPrefersMode() === 'system') {
				setActiveMode(getSystemPrefersMode());
			}
		};

		mql.addEventListener('change', listener);

		return () => {
			mql.removeEventListener('change', listener);
		};
	});
</script>

<svelte:head>
	<!-- This causes the new eslint-plugin-svelte: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>
