// Modified version of the light switch by: https://skeleton.dev

import { persisted } from 'svelte-persisted-store';

/**
 * Stores
 */

const systemPrefersMode = persisted<'dark' | 'light'>('systemPrefersMode', 'dark');
const userPrefersMode = persisted<'dark' | 'light' | undefined>('userPrefersMode', undefined);
export const mode = persisted<'dark' | 'light'>('mode', 'dark');

/**
 * Getters
 */

/** Get the operating system preference */
export function getSystemPrefersMode(): 'dark' | 'light' {
	const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
		? 'light'
		: 'dark';
	systemPrefersMode.set(prefersLightMode);
	return prefersLightMode;
}

/**
 * Setters
 */

/** Set the user preference */
function setUserPrefersMode(value: 'dark' | 'light' | undefined): void {
	userPrefersMode.set(value);
}

/** Set the current mode */
export function setCurrentMode(value: 'dark' | 'light'): void {
	const htmlEl = document.documentElement;

	if (value === 'light') {
		htmlEl.classList.remove('dark');
		htmlEl.style.colorScheme = 'light';
	} else {
		htmlEl.classList.add('dark');
		htmlEl.style.colorScheme = 'dark';
	}

	mode.set(value);
}

/**
 * Lightswitch Utility
 */

/**
 * Set light/dark class based on user/system preference
 *
 * Should be added to <head> to prevent FOUC
 *
 * This function needs to be able to be stringified and thus it cannot use other functions
 */
export function setInitialClassState() {
	const htmlEl = document.documentElement;

	let userPref: string | null = null;
	try {
		userPref = JSON.parse(localStorage.getItem('userPrefersMode') || 'null');
	} catch {
		// ignore JSON parsing errors
	}

	const systemPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

	if (userPref === 'light' || (userPref === null && systemPref === 'light')) {
		htmlEl.classList.remove('dark');
		htmlEl.style.colorScheme = 'light';
	} else {
		htmlEl.classList.add('dark');
		htmlEl.style.colorScheme = 'dark';
	}
}

/** Toggle between light and dark mode */
export function toggleMode(): void {
	mode.update((curr) => {
		const next = curr === 'dark' ? 'light' : 'dark';
		setUserPrefersMode(next);
		setCurrentMode(next);
		return next;
	});
}

/** Set the mode to light or dark */
export function setMode(next: 'dark' | 'light'): void {
	mode.update((curr) => {
		if (curr === next) return curr;
		setUserPrefersMode(next);
		setCurrentMode(next);
		return next;
	});
}

/** Reset the mode to operating system preference */
export function resetMode(): void {
	mode.update(() => {
		setUserPrefersMode(undefined);
		const next = getSystemPrefersMode();
		setCurrentMode(next);
		return next;
	});
}
