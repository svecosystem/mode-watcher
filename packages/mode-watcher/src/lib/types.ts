import type { modes } from "./modes.js";

export type Mode = (typeof modes)[number];
export type ThemeColors = { dark: string; light: string } | undefined;

export type ModeWatcherProps = {
	/**
	 * Whether to automatically track operating system preferences
	 * and update the mode accordingly.
	 *
	 * @default `true`
	 */
	track?: boolean;

	/**
	 * The default mode to use instead of the user's preference.
	 *
	 * @default `"system"`
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
	 * @default `undefined`
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
	 * @default `["dark"]`
	 */
	darkClassNames?: string[];

	/**
	 * The classname to add to the root `html` element when the mode is light.
	 *
	 * @default `[]`
	 */
	lightClassNames?: string[];

	/**
	 * Optionally provide a custom local storage key to use for storing the mode.
	 *
	 * @default `'mode-watcher-mode'`
	 */
	modeStorageKey?: string;

	/**
	 * Optionally provide a custom local storage key to use for storing the theme.
	 *
	 * @default `'mode-watcher-theme'`
	 */
	themeStorageKey?: string;

	/**
	 * An optional nonce to use for the injected script tag to allow-list mode-watcher
	 * if you are using a Content Security Policy.
	 *
	 * @default `undefined`
	 */
	nonce?: string;

	/**
	 * Whether to disable the injected script tag that sets the initial mode.
	 * Set this if you are manually injecting the script using a hook.
	 *
	 * @default `false`
	 */
	disableHeadScriptInjection?: boolean;

	/**
	 * Whether to run the mode changes synchronously instead of using
	 * an animation frame. If true, will have an impact on blocking performance
	 * due to blocking the main thread.
	 *
	 * Only applicable if `disableTransitions` is set to `true`.
	 *
	 * @default `false`
	 */
	synchronousModeChanges?: boolean;
};
