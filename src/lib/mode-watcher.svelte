<script lang="ts">
	import { onMount } from 'svelte';
	import { systemPrefersMode, setMode, localStorageKey } from './mode';

	export let track = true;

	function setInitialMode() {
		const htmlEl = document.documentElement;

		const mode = localStorage.getItem('mode') || 'system';
		const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

		if (mode === 'light' || (mode === 'system' && system === 'light')) {
			htmlEl.classList.remove('dark');
			htmlEl.style.colorScheme = 'light';
		} else {
			htmlEl.classList.add('dark');
			htmlEl.style.colorScheme = 'dark';
		}

		localStorage.setItem('mode', mode);
	}

	const stringified = setInitialMode.toString();

	onMount(() => {
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		setMode((localStorage.getItem(localStorageKey) as 'dark' | 'light' | 'system') || 'system');
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script nonce="%sveltekit.nonce%">(` + stringified + `)();</script>`}
</svelte:head>
