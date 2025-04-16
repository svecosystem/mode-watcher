import {
	generateSetInitialModeExpression,
	resetMode,
	setMode,
	setTheme,
	toggleMode,
} from "./mode.js";
import {
	mode,
	modeStorageKey,
	themeStorageKey,
	theme,
	userPrefersMode,
	systemPrefersMode,
} from "./states.svelte.js";

export {
	generateSetInitialModeExpression,
	setMode,
	toggleMode,
	resetMode,
	modeStorageKey,
	userPrefersMode,
	systemPrefersMode,
	mode,
	theme,
	setTheme,
	themeStorageKey,
};

export { default as ModeWatcher } from "./components/mode-watcher.svelte";
