<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getSystemPrefersMode,
		getUserPrefersMode,
		setActiveMode,
		setInitialClassState
	} from './mode';
	import { browser } from '$app/environment';

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

	if (browser) {
		setInitialClassState();
	}
</script>
