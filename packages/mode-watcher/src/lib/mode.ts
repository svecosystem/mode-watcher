import { get } from "svelte/store";
import {
	modeStorageKey,
	userPrefersMode,
	systemPrefersMode,
	derivedMode,
	themeColors,
	theme as themeStore,
	disableTransitions,
	derivedTheme,
	themeStorageKey,
} from "./stores.js";
import type { Mode, ThemeColors } from "./types.js";

/** Toggle between light and dark mode */
export function toggleMode(): void {
	userPrefersMode.set(get(derivedMode) === "dark" ? "light" : "dark");
}

/** Set the mode to light or dark */
export function setMode(mode: Mode): void {
	userPrefersMode.set(mode);
}

/** Reset the mode to operating system preference */
export function resetMode(): void {
	userPrefersMode.set("system");
}

/** Set the theme to a custom value */
export function setTheme(theme: string): void {
	themeStore.set(theme);
}

export function defineConfig(config: SetInitialModeArgs) {
	return config;
}

type SetInitialModeArgs = {
	defaultMode: Mode;
	themeColors?: ThemeColors;
	darkClassNames: string[];
	lightClassNames: string[];
	defaultTheme: string;
	modeStorageKey: string;
	themeStorageKey: string;
};

/** Used to set the mode on initial page load to prevent FOUC */
export function setInitialMode({
	defaultMode,
	themeColors,
	darkClassNames = ["dark"],
	lightClassNames = [],
	defaultTheme = "",
}: SetInitialModeArgs) {
	const rootEl = document.documentElement;
	const mode = localStorage.getItem("mode-watcher-mode") || defaultMode;
	const theme = localStorage.getItem("mode-watcher-theme") || defaultTheme;
	const light =
		mode === "light" ||
		(mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
	if (light) {
		if (darkClassNames.length) rootEl.classList.remove(...darkClassNames);
		if (lightClassNames.length) rootEl.classList.add(...lightClassNames);
	} else {
		if (lightClassNames.length) rootEl.classList.remove(...lightClassNames);
		if (darkClassNames.length) rootEl.classList.add(...darkClassNames);
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
		localStorage.setItem("mode-watcher-theme", theme);
	}

	localStorage.setItem("mode-watcher-mode", mode);
}

export {
	modeStorageKey,
	themeStorageKey,
	derivedTheme as theme,
	userPrefersMode,
	systemPrefersMode,
	derivedMode as mode,
	themeColors,
	disableTransitions,
};
