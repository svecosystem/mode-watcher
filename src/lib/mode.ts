// Modified version of the light switch by: https://skeleton.dev

import { derived, get } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

/**
 * Stores
 * ----
 * TRUE: Light mode | FALSE: Dark mode
 */

const modeOsPrefers = persisted<boolean>('modeOsPrefers', false);
const modeUserPrefers = persisted<boolean | undefined>('modeUserPrefers', undefined);
const modeCurrent = persisted<boolean>('modeCurrent', false);

/** Derived store with either `"light"` or `"dark"` depending on the current mode */
export const mode = derived(modeCurrent, ($modeCurrent) => ($modeCurrent ? 'light' : 'dark'));

/**
 * Getters
 */

/** Get the OS preference */
export function getModeOsPrefers(): boolean {
	const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
	modeOsPrefers.set(prefersLightMode);
	return prefersLightMode;
}

/** Get the User preference */
function getModeUserPrefers(): boolean | undefined {
	return get(modeUserPrefers);
}

/** Get the automatic preference */
export function getModeAutoPrefers(): boolean {
	const os = getModeOsPrefers();
	const user = getModeUserPrefers();
	return user !== undefined ? user : os;
}

/**
 * Setters
 */

/** Set the user preference */
function setModeUserPrefers(value: boolean | undefined): void {
	modeUserPrefers.set(value);
}

/** Set the current mode */
export function setModeCurrent(value: boolean): void {
	const htmlEl = document.documentElement;
	const classDark = 'dark';
	if (value === true) {
		htmlEl.classList.remove(classDark);
		htmlEl.style.colorScheme = 'light';
	} else {
		htmlEl.classList.add(classDark);
		htmlEl.style.colorScheme = 'dark';
	}
	modeCurrent.set(value);
}

/**
 * Lightswitch Utility
 */

/** Set the visible light/dark mode on page load */
export function setInitialClassState() {
	const htmlEl = document.documentElement;

	const condLocalStorageUserPrefs = localStorage.getItem('modeUserPrefers') === 'false';
	const condLocalStorageUserPrefsExist = !('modeUserPrefers' in localStorage);
	const condMatchMedia = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (condLocalStorageUserPrefs || (condLocalStorageUserPrefsExist && condMatchMedia)) {
		htmlEl.classList.add('dark');
		htmlEl.style.colorScheme = 'dark';
	} else {
		htmlEl.classList.remove('dark');
		htmlEl.style.colorScheme = 'light';
	}
}

/**
 * Auto Mode Watcher
 */

/** Automatically set the visible light/dark updates on change */
export function autoModeWatcher(): void {
	const mql = window.matchMedia('(prefers-color-scheme: dark)');
	function setMode(value: boolean) {
		const htmlEl = document.documentElement;
		const classDark = 'dark';
		if (value === true) {
			htmlEl.classList.remove(classDark);
			htmlEl.style.colorScheme = 'light';
		} else {
			htmlEl.classList.add(classDark);
			htmlEl.style.colorScheme = 'dark';
		}
	}
	setMode(mql.matches);
	mql.onchange = () => {
		setMode(mql.matches);
	};
}

/**
 * Toggle between light and dark mode
 */
export function toggleMode(): void {
	modeCurrent.update((curr) => {
		const next = !curr;
		setModeUserPrefers(next);
		setModeCurrent(next);
		return next;
	});
}

/**
 * Set the mode to light or dark
 */
export function setMode(mode: 'light' | 'dark'): void {
	modeCurrent.update((curr) => {
		const next = mode === 'light';
		if (curr === next) return curr;
		setModeUserPrefers(next);
		setModeCurrent(next);
		return next;
	});
}

/**
 * Reset the mode to OS preference
 */
export function resetMode(): void {
	modeCurrent.update(() => {
		setModeUserPrefers(undefined);
		const next = getModeOsPrefers();
		setModeCurrent(next);
		return next;
	});
}
