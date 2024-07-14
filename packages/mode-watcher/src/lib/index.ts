import {
	localStorageKey,
	mode,
	resetMode,
	setMode,
	systemPrefersMode,
	toggleMode,
	userPrefersMode,
} from "./mode.js";

export {
	setMode,
	toggleMode,
	resetMode,
	localStorageKey,
	userPrefersMode,
	systemPrefersMode,
	mode,
};

export { default as ModeWatcher } from "./mode-watcher.svelte";
