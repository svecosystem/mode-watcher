<script lang="ts">
	import { onMount } from 'svelte';
	import { systemPrefersMode, setMode, localStorageKey, mode } from './mode';

	export let track = true;

	onMount(() => {
		const unsubscriber = mode.subscribe(() => {});
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		setMode((localStorage.getItem(localStorageKey) as 'dark' | 'light' | 'system') || 'system');

		return () => {
			unsubscriber();
		};
	});

	function setInitialMode() {
		const e = document.documentElement,
			m = localStorage.getItem('mode') || 'system',
			l =
				m === 'light' ||
				(m === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

		e.classList[l ? 'remove' : 'add']('dark');
		e.style.colorScheme = l ? 'light' : 'dark';
		localStorage.setItem('mode', m);
	}

	const stringified = setInitialMode.toString();
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script nonce="%sveltekit.nonce%">(` + stringified + `)();</script>`}
</svelte:head>
