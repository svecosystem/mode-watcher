import { userPrefersMode } from "./mode-states.svelte.js";
import { customTheme } from "./theme-state.svelte.js";
import { derivedMode } from "./states.svelte.js";
import type { Mode, ThemeColors } from "./types.js";
import setInitialMode from "./set-initial-mode.js?raw";

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

export type SetInitialModeArgs = {
	defaultMode?: Mode;
	themeColors?: ThemeColors;
	darkClassNames?: string[];
	lightClassNames?: string[];
	defaultTheme?: string;
	modeStorageKey?: string;
	themeStorageKey?: string;
};

/**
 * A type-safe way to generate the source expression used to set the initial mode and avoid FOUC.
 *
 * @deprecated Use `createInitialModeExpression` instead.
 */
export function generateSetInitialModeExpression(config: SetInitialModeArgs = {}): string {
	return `(${setInitialMode})(${JSON.stringify(config)});`;
}

/**
 * A type-safe way to generate the source expression used to set the initial mode and avoid FOUC.
 */
export const createInitialModeExpression = generateSetInitialModeExpression;
