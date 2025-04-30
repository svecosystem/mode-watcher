import { box } from "svelte-toolbelt";

/**
 * The key used to store the `mode` in localStorage.
 */
export const modeStorageKey = box<string>("mode-watcher-mode");

/**
 * The key used to store the `theme` in localStorage.
 */
export const themeStorageKey = box<string>("mode-watcher-theme");
