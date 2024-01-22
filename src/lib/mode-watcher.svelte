<script lang="ts">
	import { onMount } from 'svelte';
	import {
		systemPrefersMode,
		setMode,
		localStorageKey,
		mode,
		themeColors as themeColorsStore
	} from './mode.js';
	import type { Mode, ThemeColors } from './types.js';

	export let track = true;
	export let defaultMode: Mode = 'system';
	// TODO: how can I pass this prop to stores in stores.ts BEFORE they are initialized??
	export let themeColors: ThemeColors = undefined;

	themeColorsStore.set(themeColors);

	onMount(() => {
		const unsubscriber = mode.subscribe(() => {});
		systemPrefersMode.tracking(track);
		systemPrefersMode.query();
		setMode((localStorage.getItem(localStorageKey) as 'dark' | 'light' | 'system') || defaultMode);

		return () => {
			unsubscriber();
		};
	});

	function setInitialMode(defaultMode: Mode, themeColors?: ThemeColors) {
		const rootEl = document.documentElement;
		const mode = localStorage.getItem('mode') || defaultMode;
		const light =
			mode === 'light' ||
			(mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

		rootEl.classList[light ? 'remove' : 'add']('dark');
		rootEl.style.colorScheme = light ? 'light' : 'dark';

		if (themeColors) {
			const themeMetaEl = document.querySelector('meta[name="theme-color"]');
			if (themeMetaEl) {
				themeMetaEl.setAttribute(
					'content',
					mode === 'light' ? themeColors.light : themeColors.dark
				);
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
