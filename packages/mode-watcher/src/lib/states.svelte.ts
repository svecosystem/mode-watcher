import { box } from "svelte-toolbelt";
import { isBrowser, noopStorage, sanitizeClassNames } from "./utils.js";
import { isValidMode } from "./modes.js";
import type { Mode, ThemeColors } from "./types.js";
import { PersistedState } from "runed";
import { MediaQuery } from "svelte/reactivity";
import { withoutTransition } from "./without-transition.js";

/**
 * The key used to store the `mode` in localStorage.
 */
export const modeStorageKey = box<string>("mode-watcher-mode");

/**
 * The key used to store the `theme` in localStorage.
 */
export const themeStorageKey = box<string>("mode-watcher-theme");

/**
 * Writable state that represents the user's preferred mode
 * (`"dark"`, `"light"` or `"system"`)
 */
export const userPrefersMode = createUserPrefersMode();

/**
 * Readable store that represents the system's preferred mode (`"dark"`, `"light"` or `undefined`)
 */
export const systemPrefersMode = createSystemMode();

/**
 * Theme colors for light and dark modes.
 */
export const themeColors = box<ThemeColors>(undefined);

/**
 * A custom theme to apply and persist to the root `html` element.
 */
export const customTheme = createCustomTheme();

/**
 * Whether to disable transitions when changing the mode.
 */
export const disableTransitions = box(true);

/**
 * The classnames to add to the root `html` element when the mode is dark.
 */
export const darkClassNames = box<string[]>([]);

/**
 * The classnames to add to the root `html` element when the mode is light.
 */
export const lightClassNames = box<string[]>([]);

function createUserPrefersMode() {
	const defaultValue: Mode = "system";

	const storage = isBrowser ? localStorage : noopStorage;
	const initialValue = storage.getItem(modeStorageKey.current);
	const value = isValidMode(initialValue) ? initialValue : defaultValue;

	return new PersistedState<Mode>(modeStorageKey.current, value, {
		serializer: {
			serialize: (v) => v,
			deserialize: (v) => {
				if (isValidMode(v)) return v;
				return defaultValue;
			},
		},
	});
}

function createCustomTheme() {
	const storage = isBrowser ? localStorage : noopStorage;
	const initialValue = storage.getItem(themeStorageKey.current);
	const value = initialValue === null || initialValue === undefined ? "" : initialValue;
	return new PersistedState<string>(themeStorageKey.current, value, {
		serializer: {
			serialize: (v) => {
				if (typeof v !== "string") return "";
				return v;
			},
			deserialize: (v) => v,
		},
	});
}

function createSystemMode() {
	const defaultValue = undefined;
	let track = true;
	let current = $state<"light" | "dark" | undefined>(defaultValue);

	function query() {
		if (!isBrowser) return;
		current = mediaQueryState.current ? "light" : "dark";
	}

	function tracking(active: boolean) {
		track = active;
	}

	const mediaQueryState = new MediaQuery("prefers-color-scheme: light");

	$effect.root(() => {
		$effect.pre(() => {
			if (!track) return;
			query();
		});
	});

	return {
		get current() {
			return current;
		},
		query,
		tracking,
	};
}

function createDerivedMode() {
	const current = $derived.by(() => {
		if (!isBrowser) return undefined;
		const derivedMode =
			userPrefersMode.current === "system"
				? systemPrefersMode.current
				: userPrefersMode.current;
		const sanitizedDarkClassNames = sanitizeClassNames(darkClassNames.current);
		const sanitizedLightClassNames = sanitizeClassNames(lightClassNames.current);

		function update() {
			const htmlEl = document.documentElement;
			const themeColorEl = document.querySelector('meta[name="theme-color"]');
			if (derivedMode === "light") {
				if (sanitizedDarkClassNames.length)
					htmlEl.classList.remove(...sanitizedDarkClassNames);
				if (sanitizedLightClassNames.length)
					htmlEl.classList.add(...sanitizedLightClassNames);
				htmlEl.style.colorScheme = "light";
				if (themeColorEl && themeColors.current) {
					themeColorEl.setAttribute("content", themeColors.current.light);
				}
			} else {
				if (sanitizedLightClassNames.length)
					htmlEl.classList.remove(...sanitizedLightClassNames);
				if (sanitizedDarkClassNames.length)
					htmlEl.classList.add(...sanitizedDarkClassNames);
				htmlEl.style.colorScheme = "dark";
				if (themeColorEl && themeColors.current) {
					themeColorEl.setAttribute("content", themeColors.current.dark);
				}
			}
		}

		if (disableTransitions.current) {
			withoutTransition(update);
		} else {
			update();
		}

		return derivedMode;
	});

	return {
		get current() {
			return current;
		},
	};
}

function createDerivedTheme() {
	const current = $derived.by(() => {
		customTheme.current;
		console.log("customTheme.current changed", customTheme.current);
		if (!isBrowser) return undefined;

		function update() {
			const htmlEl = document.documentElement;
			htmlEl.setAttribute("data-theme", customTheme.current);
		}

		if (disableTransitions.current) {
			withoutTransition(update);
		} else {
			update();
		}
		return customTheme.current;
	});

	return {
		get current() {
			return current;
		},
	};
}

/**
 * Derived store that represents the current mode (`"dark"`, `"light"` or `undefined`)
 */
export const derivedMode = createDerivedMode();

/**
 * Derived store that represents the current custom theme
 */
export const derivedTheme = createDerivedTheme();

export { derivedMode as mode, derivedTheme as theme };
