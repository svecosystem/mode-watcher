// Modified version of the light switch by: https://skeleton.dev

import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

/** Persistent store with either `"light"`, `"dark"` or `"system"` depending on the current mode */
export const mode = persisted<'light' | 'dark' | 'system'>('mode', 'system');

/**
 * Getters
 */

/** Get the current mode */
function getCurrentMode(): 'light' | 'dark' | 'system' {
	return get(mode);
}

/** Get the operating system preference */
export function getSystemMode(): 'light' | 'dark' {
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Setters
 */

/** Set class & color scheme for the `html` element */
function setHtmlClassColorScheme(nextMode: 'light' | 'dark' | 'system'): void {
	const htmlEl = document.documentElement;
	const systemMode = getSystemMode();

	if (nextMode === 'light' || (nextMode === 'system' && systemMode === 'light')) {
		htmlEl.classList.remove('dark');
		htmlEl.style.colorScheme = 'light';
	}

	if (nextMode === 'dark' || (nextMode === 'system' && systemMode === 'dark')) {
		htmlEl.classList.add('dark');
		htmlEl.style.colorScheme = 'dark';
	}
}

/** Set the current mode */
export function setCurrentMode(nextMode: 'light' | 'dark' | 'system'): void {
	mode.set(nextMode);
	setHtmlClassColorScheme(nextMode);
}

/** Set the visible light/dark mode on page load */
export function setInitialMode(): void {
	const currentMode = getCurrentMode();
	setCurrentMode(currentMode);
}

/**
 * Toggle between light and dark mode
 */
export function toggleMode(): void {
	const currentMode = getCurrentMode();
	const systemMode = getSystemMode();

	const nextMode =
		currentMode === 'system'
			? systemMode === 'light'
				? 'dark'
				: 'light'
			: currentMode === 'light'
			? 'dark'
			: 'light';

	setCurrentMode(nextMode);
}

/**
 * Set the mode to light or dark
 */
export function setMode(mode: 'light' | 'dark'): void {
	setCurrentMode(mode);
}

/**
 * Reset the mode to system preference
 */
export function resetMode(): void {
	setCurrentMode('system');
}
