import { writable, derived } from 'svelte/store';
import { withoutTransition } from './without-transition';

// saves having to branch for server vs client
const noopStorage = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getItem: (_key: string) => null,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setItem: (_key: string, _value: string) => {}
};

// whether we are running on server vs client
const isBrowser = typeof document !== 'undefined';

/**
 * The key used to store the mode in localStorage.
 */
export const localStorageKey = 'mode';
/**
 * Writable store that represents the user's preferred mode (`"dark"`, `"light"` or `"system"`)
 */
export const userPrefersMode = createUserPrefersMode();
/**
 * Readable store that represents the system's preferred mode (`"dark"`, `"light"` or `undefined`)
 */
export const systemPrefersMode = createSystemMode();
/**
 * Derived store that represents the current mode (`"dark"`, `"light"` or `undefined`)
 */
export const derivedMode = createDerivedMode();

// derived from: https://github.com/CaptainCodeman/svelte-web-storage
function createUserPrefersMode() {
	const defaultValue = 'system';

	const storage = isBrowser ? localStorage : noopStorage;
	let value = (storage.getItem(localStorageKey) as 'dark' | 'light' | 'system') || defaultValue;

	const { subscribe, set: _set } = writable(value, () => {
		if (isBrowser) {
			const handler = (e: StorageEvent) => {
				if (e.key === localStorageKey) {
					_set((value = (e.newValue as 'dark' | 'light' | 'system') || defaultValue));
				}
			};
			addEventListener('storage', handler);
			return () => removeEventListener('storage', handler);
		}
	});

	function set(v: 'dark' | 'light' | 'system') {
		_set((value = v));
		storage.setItem(localStorageKey, value);
	}

	return {
		subscribe,
		set
	};
}

function createSystemMode() {
	const defaultValue = undefined;
	let track = true;

	const { subscribe, set } = writable<'dark' | 'light' | undefined>(defaultValue, () => {
		if (isBrowser) {
			const handler = (e: MediaQueryListEvent) => {
				if (track) {
					set(e.matches ? 'light' : 'dark');
				}
			};
			const mediaQueryState = window.matchMedia('(prefers-color-scheme: light)');
			mediaQueryState.addEventListener('change', handler);
			return () => mediaQueryState.removeEventListener('change', handler);
		}
	});

	/**
	 * Query system preferences and update the store.
	 */
	function query() {
		if (isBrowser) {
			const mediaQueryState = window.matchMedia('(prefers-color-scheme: light)');
			set(mediaQueryState.matches ? 'light' : 'dark');
		}
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
		tracking
	};
}

function createDerivedMode() {
	const { subscribe } = derived(
		[userPrefersMode, systemPrefersMode],
		([$userPrefersMode, $systemPrefersMode]) => {
			if (!isBrowser) return undefined;

			const derivedMode = $userPrefersMode === 'system' ? $systemPrefersMode : $userPrefersMode;

			withoutTransition(() => {
				const htmlEl = document.documentElement;
				const themeColorEl = document.querySelector('meta[name="theme-color"]');
				if (derivedMode === 'light') {
					htmlEl.classList.remove('dark');
					htmlEl.style.colorScheme = 'light';
					if (themeColorEl) {
						// TODO: how do I get the themeColors prop?
						// themeColorEl.setAttribute('content', themeColors.light);
					}
				} else {
					htmlEl.classList.add('dark');
					htmlEl.style.colorScheme = 'dark';
					if (themeColorEl) {
						// TODO: how do I get the themeColors prop?
						// themeColorEl.setAttribute('content', themeColors.dark);
					}
				}
			});

			return derivedMode;
		}
	);

	return {
		subscribe
	};
}
