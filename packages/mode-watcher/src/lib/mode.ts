import { derivedMode, customTheme, userPrefersMode } from "./states.svelte.js";
import type { Mode, ThemeColors } from "./types.js";

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

type SetInitialModeArgs = {
	defaultMode?: Mode;
	themeColors?: ThemeColors;
	darkClassNames?: string[];
	lightClassNames?: string[];
	defaultTheme?: string;
	modeStorageKey?: string;
	themeStorageKey?: string;
};

// @ts-expect-error - this is fine
// prettier-ignore
export function setInitialMode(a){const{defaultMode:b="system",themeColors:c,darkClassNames:d=["dark"],lightClassNames:e=[],defaultTheme:f="",modeStorageKey:g="mode-watcher-mode",themeStorageKey:h="mode-watcher-theme"}=a||{};const k=document.documentElement,l=localStorage.getItem(g)??b,m=localStorage.getItem(h)??f,n=l=="light"||(l=="system"&&matchMedia("(prefers-color-scheme: light)").matches),p=(q,r)=>q.length&&k.classList[r](...q);if(n){p(d,"remove");p(e,"add")}else{p(e,"remove");p(d,"add")}k.style.colorScheme=n?"light":"dark";let s;if(c&&(s=document.querySelector('meta[name="theme-color"]')))s.setAttribute("content",n?c.light:c.dark);if(m){k.setAttribute("data-theme",m);localStorage.setItem(h,m)}localStorage.setItem(g,l)}

// The below code is minified above to reduce client bundle size when stringifying this into a
// script tag.
/** Used to set the mode on initial page load to prevent FOUC */
// export function setInitialMode({
// 	defaultMode = "system",
// 	themeColors,
// 	darkClassNames = ["dark"],
// 	lightClassNames = [],
// 	defaultTheme = "",
// 	modeStorageKey = "mode-watcher-mode",
// 	themeStorageKey = "mode-watcher-theme",
// }: SetInitialModeArgs) {
// 	const rootEl = document.documentElement;
// 	const mode = localStorage.getItem(modeStorageKey) ?? defaultMode;
// 	const theme = localStorage.getItem(themeStorageKey) ?? defaultTheme;
// 	const light =
// 		mode === "light" ||
// 		(mode === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
// 	if (light) {
// 		if (darkClassNames.length) rootEl.classList.remove(...darkClassNames);
// 		if (lightClassNames.length) rootEl.classList.add(...lightClassNames);
// 	} else {
// 		if (lightClassNames.length) rootEl.classList.remove(...lightClassNames);
// 		if (darkClassNames.length) rootEl.classList.add(...darkClassNames);
// 	}
// 	rootEl.style.colorScheme = light ? "light" : "dark";

// 	if (themeColors) {
// 		const themeMetaEl = document.querySelector('meta[name="theme-color"]');
// 		if (themeMetaEl) {
// 			themeMetaEl.setAttribute(
// 				"content",
// 				mode === "light" ? themeColors.light : themeColors.dark
// 			);
// 		}
// 	}

// 	if (theme) {
// 		rootEl.setAttribute("data-theme", theme);
// 		localStorage.setItem(themeStorageKey, theme);
// 	}

// 	localStorage.setItem(modeStorageKey, mode);
// }

/**
 * A type-safe way to generate the source expression used to set the initial mode and avoid FOUC.
 */
export function generateSetInitialModeExpression(config: SetInitialModeArgs = {}): string {
	return `(${setInitialMode.toString()})(${JSON.stringify(config)});`;
}
