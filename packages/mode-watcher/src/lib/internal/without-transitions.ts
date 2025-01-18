// Original Source: https://reemus.dev/article/disable-css-transition-color-scheme-change#heading-ultimate-solution-for-changing-color-scheme-without-transitions

/**
 * Performs a task without any CSS transitions
 */
export function withoutTransitions(action: () => void) {
	// Create a style element to disable transitions
	const style = document.createElement("style");
	const css = document.createTextNode("* { transition: none !important; }");
	style.appendChild(css);

	document.head.appendChild(style);
	action();

	// getComputedStyle forces the browser to repaint
	window.getComputedStyle(style).opacity;
	document.head.removeChild(style);
}
