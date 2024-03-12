import type { modes } from './stores.js';

export type Mode = (typeof modes)[number];
export type ThemeColors = { dark: string; light: string } | undefined;

export type ModeWatcherProps = {
	/**
	 * Whether to automatically track operating system preferences
	 * and update the mode accordingly.
	 *
	 * @defaultValue `true`
	 */
	track?: boolean;

	/**
	 * The default mode to use instead of the user's preference.
	 *
	 * @defaultValue `"system"`
	 */
	defaultMode?: Mode;

	/**
	 * The theme colors to use for each mode.
	 */
	themeColors?: ThemeColors;

	/**
	 * Whether to disable transitions when updating the mode.
	 */
	disableTransitions?: boolean;
};
