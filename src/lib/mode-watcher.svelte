<script lang="ts">
	import { onMount } from 'svelte';
	import { systemPrefersMode, setMode, localStorageKey, mode } from './mode';

	export let track = true;
	export let defaultMode: 'light' | 'dark' | 'system' = 'system';
	// TODO: how can I pass this prop to stores.ts BEFORE they are initialized??
	export let themeColors: { dark: string; light: string } | undefined = undefined;

	onMount(() => {
		const unsubscriber = mode.subscribe(() => {});
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		setMode((localStorage.getItem(localStorageKey) as 'dark' | 'light' | 'system') || defaultMode);

		return () => {
			unsubscriber();
		};
	});

	function setInitialMode(
		defaultMode: 'light' | 'dark' | 'system',
		themeColors?: { dark: string; light: string }
	) {
		const elem = document.documentElement,
			mode = localStorage.getItem('mode') || defaultMode,
			light =
				mode === 'light' ||
				(mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

		elem.classList[light ? 'remove' : 'add']('dark');
		elem.style.colorScheme = light ? 'light' : 'dark';

		if (themeColors) {
			const te = document.querySelector('meta[name="theme-color"]');
			if (te) {
				te.setAttribute('content', mode === 'light' ? themeColors.light : themeColors.dark);
			}
		}

		localStorage.setItem('mode', mode);
	}

	const args = `"${defaultMode}"${themeColors ? `, ${JSON.stringify(themeColors)}` : ''}`;
	const stringified = setInitialMode.toString();
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script nonce="%sveltekit.nonce%">(` + stringified + `)(` + args + `);</script>`}
</svelte:head>
