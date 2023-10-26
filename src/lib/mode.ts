// Modified version of the light switch by: https://skeleton.dev

import { derived } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

/**
 * Stores
 */

const modeOsPrefers = persisted<'light' | 'dark'>('modeOsPrefers', 'dark');
const modeUserPrefers = persisted<'light' | 'dark' | undefined>('modeUserPrefers', undefined);
const modeCurrent = persisted<'light' | 'dark'>('modeCurrent', 'dark');

/** Derived store with either `"light"` or `"dark"` depending on the current mode */
export const mode = derived(modeCurrent, ($modeCurrent) => $modeCurrent);

/**
 * Getters
 */

/** Get the OS preference */
export function getModeOsPrefers(): 'light' | 'dark' {
	const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark';
	modeOsPrefers.set(prefersLightMode);
	return prefersLightMode;
}

/**
 * Setters
 */

/** Set the user preference */
function setModeUserPrefers(value: 'light' | 'dark' | undefined): void {
	modeUserPrefers.set(value);
}

/** Set the current mode */
export function setModeCurrent(value: 'light' | 'dark'): void {
	const htmlEl = document.documentElement;

	if (value === 'light') {
		htmlEl.classList.remove('dark');
		htmlEl.style.colorScheme = 'light';
	}
	if (value === 'dark') {
		htmlEl.classList.add('dark');
		htmlEl.style.colorScheme = 'dark';
	}
	modeCurrent.set(value);
}

/**
 * Lightswitch Utility
 */

/**
 * Set the visible light/dark mode on page load
 *
 * This function needs to be able to be stringified and thus it cannot use other functions
 */
export function setInitialClassState() {
	const htmlEl = document.documentElement;

	const userPrefersMode = localStorage.getItem('modeUserPrefers');

	const systemPrefersMode = window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark';

	if (userPrefersMode === 'dark' || systemPrefersMode === 'dark') {
		htmlEl.classList.add('dark');
		htmlEl.style.colorScheme = 'dark';
	}

	if (userPrefersMode === 'light' || systemPrefersMode === 'light') {
		htmlEl.classList.remove('dark');
		htmlEl.style.colorScheme = 'light';
	}
}

/** Toggle between light and dark mode */
export function toggleMode(): void {
	modeCurrent.update((curr) => {
		const next = curr === 'light' ? 'dark' : 'light';
		setModeUserPrefers(next);
		setModeCurrent(next);
		return next;
	});
}

/** Set the mode to light or dark */
export function setMode(mode: 'light' | 'dark'): void {
	modeCurrent.update((curr) => {
		if (curr === mode) return curr;
		setModeUserPrefers(mode);
		setModeCurrent(mode);
		return mode;
	});
}

/** Reset the mode to OS preference */
export function resetMode(): void {
	modeCurrent.update(() => {
		setModeUserPrefers(undefined);
		const next = getModeOsPrefers();
		setModeCurrent(next);
		return next;
	});
}
