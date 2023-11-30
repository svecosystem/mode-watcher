<script lang="ts">
	import { onMount } from 'svelte';
	import { systemPrefersMode, setMode, localStorageKey, mode } from './mode';

	export let track = true;
	export let defaultMode: 'light' | 'dark' | 'system' = 'system';

	onMount(() => {
		const unsubscriber = mode.subscribe(() => {});
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		setMode((localStorage.getItem(localStorageKey) as 'dark' | 'light' | 'system') || defaultMode);

		return () => {
			unsubscriber();
		};
	});

	function setInitialMode() {
		const elem = document.documentElement,
			mode = localStorage.getItem('mode') || '<DEFAULT_MODE>',
			light =
				mode === 'light' ||
				(mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

		elem.classList[light ? 'remove' : 'add']('dark');
		elem.style.colorScheme = light ? 'light' : 'dark';
		localStorage.setItem('mode', mode);
	}

	const stringified = setInitialMode.toString().replace('<DEFAULT_MODE>', defaultMode);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script nonce="%sveltekit.nonce%">(` + stringified + `)();</script>`}
</svelte:head>
