import {
	generateSetInitialModeExpression,
	createInitialModeExpression,
	resetMode,
	setMode,
	setTheme,
	toggleMode,
} from "./mode.js";
import { modeStorageKey, themeStorageKey } from "./storage-keys.svelte.js";
import { mode, theme } from "./states.svelte.js";
import { userPrefersMode, systemPrefersMode } from "./mode-states.svelte.js";

export {
	generateSetInitialModeExpression,
	createInitialModeExpression,
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
export type { SystemModeValue, UserPrefersMode, SystemPrefersMode } from "./mode-states.svelte.js";
export { default as ModeWatcher } from "./components/mode-watcher.svelte";
