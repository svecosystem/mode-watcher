import { get } from 'svelte/store';
import {
	localStorageKey,
	userPrefersMode,
	systemPrefersMode,
	derivedMode,
	themeColors
} from './stores.js';
import type { Mode } from './types.js';

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

export { localStorageKey, userPrefersMode, systemPrefersMode, derivedMode as mode, themeColors };
