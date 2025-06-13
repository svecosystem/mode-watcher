import { userPrefersMode } from "./mode-states.svelte.js";
import { customTheme } from "./theme-state.svelte.js";
import { derivedMode } from "./states.svelte.js";
import type { Mode, ThemeColors } from "./types.js";

/** Toggle between light and dark mode */
export function toggleMode(): void {
	userPrefersMode.current = derivedMode.current === "dark" ? "light" : "dark";
}

/** Set the mode to light or dark */
export function setMode(mode: Mode): void {
	userPrefersMode.current = mode;
}

/** Reset the mode to operating system preference */
export function resetMode(): void {
	userPrefersMode.current = "system";
}

/** Set the theme to a custom value */
export function setTheme(newTheme: string): void {
	customTheme.current = newTheme;
}

export function defineConfig(config: SetInitialModeArgs) {
	return config;
}

type SetInitialModeArgs = {
	defaultMode?: Mode;
	themeColors?: ThemeColors;
	darkClassNames?: string[];
	lightClassNames?: string[];
	defaultTheme?: string;
	modeStorageKey?: string;
	themeStorageKey?: string;
};

/** Used to set the mode on initial page load to prevent FOUC */
export function setInitialMode({
	defaultMode = "system",
	themeColors,
	darkClassNames = ["dark"],
	lightClassNames = [],
	defaultTheme = "",
	modeStorageKey = "mode-watcher-mode",
	themeStorageKey = "mode-watcher-theme",
}: SetInitialModeArgs) {
	const rootEl = document.documentElement;
	const mode = localStorage.getItem(modeStorageKey) ?? defaultMode;
	const theme = localStorage.getItem(themeStorageKey) ?? defaultTheme;
	const light =
		mode === "light" ||
		(mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
	if (light) {
		if (darkClassNames.length) rootEl.classList.remove(...darkClassNames.filter(Boolean));
		if (lightClassNames.length) rootEl.classList.add(...lightClassNames.filter(Boolean));
	} else {
		if (lightClassNames.length) rootEl.classList.remove(...lightClassNames.filter(Boolean));
		if (darkClassNames.length) rootEl.classList.add(...darkClassNames.filter(Boolean));
	}
	rootEl.style.colorScheme = light ? "light" : "dark";

	if (themeColors) {
		const themeMetaEl = document.querySelector('meta[name="theme-color"]');
		if (themeMetaEl) {
			themeMetaEl.setAttribute(
				"content",
				mode === "light" ? themeColors.light : themeColors.dark
			);
		}
	}

	if (theme) {
		rootEl.setAttribute("data-theme", theme);
		localStorage.setItem(themeStorageKey, theme);
	}

	localStorage.setItem(modeStorageKey, mode);
}

/**
 * A type-safe way to generate the source expression used to set the initial mode and avoid FOUC.
 */
export function createInitialModeExpression(config: SetInitialModeArgs = {}): string {
	return `(${setInitialMode.toString()})(${JSON.stringify(config)});`;
}

/**
 * A type-safe way to generate the source expression used to set the initial mode and avoid FOUC.
 *
 * @deprecated Use `createInitialModeExpression` instead.
 */
export const generateSetInitialModeExpression = createInitialModeExpression;
