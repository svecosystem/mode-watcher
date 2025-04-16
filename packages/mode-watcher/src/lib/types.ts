import type { modes } from "./modes.js";

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
	 * The default theme to use, which will be applied to the root `html` element
	 * and can be managed with the `setTheme` function.
	 *
	 * @example
	 * ```html
	 * <html data-theme="your-custom-theme"></html>
	 * ```
	 *
	 * @defaultValue `undefined`
	 */
	defaultTheme?: string;

	/**
	 * The theme colors to use for each mode.
	 */
	themeColors?: ThemeColors;

	/**
	 * Whether to disable transitions when updating the mode.
	 */
	disableTransitions?: boolean;

	/**
	 * The classname to add to the root `html` element when the mode is dark.
	 *
	 * @defaultValue `["dark"]`
	 */
	darkClassNames?: string[];

	/**
	 * The classname to add to the root `html` element when the mode is light.
	 *
	 * @defaultValue `[]`
	 */
	lightClassNames?: string[];

	/**
	 * Optionally provide a custom local storage key to use for storing the mode.
	 *
	 * @defaultValue `'mode-watcher-mode'`
	 */
	modeStorageKey?: string;

	/**
	 * Optionally provide a custom local storage key to use for storing the theme.
	 *
	 * @defaultValue `'mode-watcher-theme'`
	 */
	themeStorageKey?: string;

	/**
	 * An optional nonce to use for the injected script tag to allow-list mode-watcher
	 * if you are using a Content Security Policy.
	 *
	 * @defaultValue `undefined`
	 */
	nonce?: string;

	/**
	 * Whether to disable the injected script tag that sets the initial mode.
	 * Set this if you are manually injecting the script using a hook.
	 *
	 * @defaultValue `false`
	 */
	disableHeadScriptInjection?: boolean;
};
