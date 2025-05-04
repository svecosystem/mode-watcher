// Original Source: https://reemus.dev/article/disable-css-transition-color-scheme-change#heading-ultimate-solution-for-changing-color-scheme-without-transitions

let timeoutAction: number;
let timeoutEnable: number;
/**
 * Whether this is the first time the function has been
 * called, which will be true for the initial load, where
 * we shouldn't need to disable any transitions, as there
 * is nothing to transition from.
 */
let hasLoaded = false;

// Perform a task without any css transitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withoutTransition(action: () => any) {
	if (typeof document === "undefined") return;
	if (!hasLoaded) {
		hasLoaded = true;
		action();
		return;
	}
	// Clear fallback timeouts
	clearTimeout(timeoutAction);
	clearTimeout(timeoutEnable);

	// Create style element to disable transitions
	const style = document.createElement("style");
	const css = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
	style.appendChild(css);

	// Functions to insert and remove style element
	const disable = () => document.head.appendChild(style);
	const enable = () => document.head.removeChild(style);

	// Best method, getComputedStyle forces browser to repaint
	if (typeof window.getComputedStyle !== "undefined") {
		disable();
		action();
		window.getComputedStyle(style).opacity;
		enable();
		return;
	}

	// Better method, requestAnimationFrame processes function before next repaint
	if (typeof window.requestAnimationFrame !== "undefined") {
		disable();
		action();
		window.requestAnimationFrame(enable);
		return;
	}

	// Fallback
	disable();
	timeoutAction = window.setTimeout(() => {
		action();
		timeoutEnable = window.setTimeout(enable, 120);
	}, 120);
}
