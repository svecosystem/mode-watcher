// Original Source: https://reemus.dev/article/disable-css-transition-color-scheme-change#heading-ultimate-solution-for-changing-color-scheme-without-transitions

let timeoutAction: number;
let timeoutEnable: number;

// Perform a task without any css transitions
// eslint-disable-next-line ts/no-explicit-any
export function withoutTransition(action: () => any) {
	if (typeof document === "undefined") return;
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
		// eslint-disable-next-line ts/no-unused-expressions
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
