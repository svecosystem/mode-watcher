import { box } from "svelte-toolbelt";
import { isBrowser, sanitizeClassNames } from "./utils.js";
import type { ThemeColors } from "./types.js";
import { withoutTransition } from "./without-transition.js";
import { systemPrefersMode, userPrefersMode } from "./mode-states.svelte.js";
import { customTheme } from "./theme-state.svelte.js";

/**
 * Theme colors for light and dark modes.
 */
export const themeColors = box<ThemeColors>(undefined);

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
