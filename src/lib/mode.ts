import { get } from 'svelte/store';
import { localStorageKey, userPrefersMode, systemPrefersMode, derivedMode } from './stores';

/** Toggle between light and dark mode */
export function toggleMode(): void {
	userPrefersMode.set(get(derivedMode) === 'dark' ? 'light' : 'dark');
}

/** Set the mode to light or dark */
export function setMode(mode: 'dark' | 'light' | 'system'): void {
	userPrefersMode.set(mode);
}

/** Reset the mode to operating system preference */
export function resetMode(): void {
	userPrefersMode.set('system');
}

export { localStorageKey, userPrefersMode, systemPrefersMode, derivedMode as mode };
