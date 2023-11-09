import {
	localStorageKey,
	userPrefersMode,
	systemPrefersMode,
	mode,
	setMode,
	toggleMode,
	resetMode
} from './mode';

export {
	setMode,
	toggleMode,
	resetMode,
	localStorageKey,
	userPrefersMode,
	systemPrefersMode,
	mode
};

export { default as ModeWatcher } from './mode-watcher.svelte';
