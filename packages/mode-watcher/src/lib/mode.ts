import { get } from 'svelte/store';
import {
	localStorageKey,
	userPrefersMode,
	systemPrefersMode,
	derivedMode,
	themeColors,
	disableTransitions,
} from './stores.js';
import type { Mode, ThemeColors } from './types.js';

/** Toggle between light and dark mode */
export function toggleMode(): void {
	userPrefersMode.set(get(derivedMode) === 'dark' ? 'light' : 'dark');
}

/** Set the mode to light or dark */
export function setMode(mode: Mode): void {
	userPrefersMode.set(mode);
}

/** Reset the mode to operating system preference */
export function resetMode(): void {
	userPrefersMode.set('system');
}

/** Used to set the mode on initial page load to prevent FOUC */
export function setInitialMode(defaultMode: Mode, themeColors?: ThemeColors) {
	const rootEl = document.documentElement;
	const mode = localStorage.getItem('mode-watcher-mode') || defaultMode;
	const light =
		mode === 'light' ||
		(mode === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);

	rootEl.classList[light ? 'remove' : 'add']('dark');
	rootEl.style.colorScheme = light ? 'light' : 'dark';

	if (themeColors) {
		const themeMetaEl = document.querySelector('meta[name="theme-color"]');
		if (themeMetaEl) {
			themeMetaEl.setAttribute('content', mode === 'light' ? themeColors.light : themeColors.dark);
		}
	}

	localStorage.setItem('mode-watcher-mode', mode);
}

export {
	localStorageKey,
	userPrefersMode,
	systemPrefersMode,
	derivedMode as mode,
	themeColors,
	disableTransitions,
};
