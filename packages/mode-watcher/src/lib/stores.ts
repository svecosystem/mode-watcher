import { writable, derived, get } from 'svelte/store';
import { withoutTransition } from './without-transition.js';
import type { Mode, ThemeColors } from './types.js';
import { sanitizeClassNames } from './utils.js';

// saves having to branch for server vs client
const noopStorage = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getItem: (_key: string) => null,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setItem: (_key: string, _value: string) => {},
};

// whether we are running on server vs client
const isBrowser = typeof document !== 'undefined';

/**  the modes that are supported, used for validation & type derivation */
export const modes = ['dark', 'light', 'system'] as const;

/**
 * The key used to store the `mode` in localStorage.
 */
export const modeStorageKey = writable<string>('mode-watcher-mode')

/**
 * The key used to store the `theme` in localStorage.
 */
export const themeStorageKey = writable<string>('mode-watcher-theme')


/**
 * Writable store that represents the user's preferred mode (`"dark"`, `"light"` or `"system"`)
 */
export const userPrefersMode = createUserPrefersMode();
/**
 * Readable store that represents the system's preferred mode (`"dark"`, `"light"` or `undefined`)
 */
export const systemPrefersMode = createSystemMode();
/**
 * Theme colors for light and dark modes.
 */
export const themeColors = writable<ThemeColors>(undefined);

/**
 * A custom theme to apply and persist to the root `html` element.
 */
export const theme = createCustomTheme()

/**
 * Whether to disable transitions when changing the mode.
 */
export const disableTransitions = writable(true);

/**
 * The classnames to add to the root `html` element when the mode is dark.
 */
export const darkClassNames = writable<string[]>([]);

/**
 * The classnames to add to the root `html` element when the mode is light.
 */
export const lightClassNames = writable<string[]>([]);

/**
 * Derived store that represents the current mode (`"dark"`, `"light"` or `undefined`)
 */
export const derivedMode = createDerivedMode();

/**
 * Derived store that represents the current custom theme
 */
export const derivedTheme = createDerivedTheme()

// derived from: https://github.com/CaptainCodeman/svelte-web-storage
function createUserPrefersMode() {
	const defaultValue = 'system';

	const storage = isBrowser ? localStorage : noopStorage;
	const initialValue = storage.getItem(getModeStorageKey());

	let value = isValidMode(initialValue) ? initialValue : defaultValue;

	function getModeStorageKey() {
		return get(modeStorageKey);
	}

	const { subscribe, set: _set } = writable(value, () => {
		if (!isBrowser) return;
		const handler = (e: StorageEvent) => {
			if (e.key !== getModeStorageKey()) return;
			const newValue = e.newValue;
			if (isValidMode(newValue)) {
				_set((value = newValue));
			} else {
				_set((value = defaultValue));
			}
		};
		addEventListener('storage', handler);
		return () => removeEventListener('storage', handler);
	});

	function set(v: Mode) {
		_set((value = v));
		storage.setItem(getModeStorageKey(), value);
	}

	return {
		subscribe,
		set,
	};
}

function createCustomTheme() {
	const storage = isBrowser ? localStorage : noopStorage;
	const initialValue = storage.getItem(getThemeStorageKey())
	let value = initialValue === null || initialValue === undefined ? '' : initialValue

	function getThemeStorageKey() {
		return get(themeStorageKey)
	}

	const { subscribe, set: _set } = writable(value, () => {
		if (!isBrowser) return;
		const handler = (e: StorageEvent) => {
			if (e.key !== getThemeStorageKey()) return;
			const newValue = e.newValue;
			if (newValue === null) {
				_set((value = ''))
			} else {
				_set((value = newValue))
			}
		};
		addEventListener('storage', handler);
		return () => removeEventListener('storage', handler);
	});

	function set(v: string) {
		_set((value = v));
		storage.setItem(getThemeStorageKey(), value);
	}

	return {
		subscribe,
		set,
	};
}

function createSystemMode() {
	const defaultValue = undefined;
	let track = true;

	const { subscribe, set } = writable<'dark' | 'light' | undefined>(defaultValue, () => {
		if (!isBrowser) return;

		const handler = (e: MediaQueryListEvent) => {
			if (!track) return;
			set(e.matches ? 'light' : 'dark');
		};

		const mediaQueryState = window.matchMedia('(prefers-color-scheme: light)');
		mediaQueryState.addEventListener('change', handler);
		return () => mediaQueryState.removeEventListener('change', handler);
	});

	/**
	 * Query system preferences and update the store.
	 */
	function query() {
		if (!isBrowser) return;
		const mediaQueryState = window.matchMedia('(prefers-color-scheme: light)');
		set(mediaQueryState.matches ? 'light' : 'dark');
	}

	/**
	 * Enable or disable tracking of system preference changes.
	 */
	function tracking(active: boolean) {
		track = active;
	}

	return {
		subscribe,
		query,
		tracking,
	};
}

function createDerivedMode() {
	const { subscribe } = derived(
		[
			userPrefersMode,
			systemPrefersMode,
			themeColors,
			disableTransitions,
			darkClassNames,
			lightClassNames,
		],
		([
			$userPrefersMode,
			$systemPrefersMode,
			$themeColors,
			$disableTransitions,
			$darkClassNames,
			$lightClassNames,
		]) => {
			if (!isBrowser) return undefined;

			const derivedMode = $userPrefersMode === 'system' ? $systemPrefersMode : $userPrefersMode;
			const sanitizedDarkClassNames = sanitizeClassNames($darkClassNames);
			const sanitizedLightClassNames = sanitizeClassNames($lightClassNames);

			function update() {
				const htmlEl = document.documentElement;
				const themeColorEl = document.querySelector('meta[name="theme-color"]');
				if (derivedMode === 'light') {
					if (sanitizedDarkClassNames.length) htmlEl.classList.remove(...sanitizedDarkClassNames);
					if (sanitizedLightClassNames.length) htmlEl.classList.add(...sanitizedLightClassNames);
					htmlEl.style.colorScheme = 'light';
					if (themeColorEl && $themeColors) {
						themeColorEl.setAttribute('content', $themeColors.light);
					}
				} else {
					if (sanitizedLightClassNames.length) htmlEl.classList.remove(...sanitizedLightClassNames);
					if (sanitizedDarkClassNames.length) htmlEl.classList.add(...sanitizedDarkClassNames);
					htmlEl.style.colorScheme = 'dark';
					if (themeColorEl && $themeColors) {
						themeColorEl.setAttribute('content', $themeColors.dark);
					}
				}
			}

			if ($disableTransitions) {
				withoutTransition(update);
			} else {
				update();
			}

			return derivedMode;
		}
	);

	return {
		subscribe,
	};
}


function createDerivedTheme() {
	const { subscribe } = derived(
		[
			theme,
			disableTransitions
		],
		([
			$theme,
			$disableTransitions
		]) => {
			if (!isBrowser) return undefined;

			function update() {
				const htmlEl = document.documentElement;
				htmlEl.setAttribute('data-theme', $theme)
			}

			if ($disableTransitions) {
				withoutTransition(update);
			} else {
				update();
			}
			return $theme
		}
	);

	return {
		subscribe,
	};
}

export function isValidMode(value: unknown): value is Mode {
	if (typeof value !== 'string') return false;
	return modes.includes(value as Mode);
}
