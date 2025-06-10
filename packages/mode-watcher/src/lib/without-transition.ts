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
let styleElement: HTMLStyleElement | null = null;

// Create reusable style element
function getStyleElement() {
	if (styleElement) return styleElement;

	styleElement = document.createElement("style");
	styleElement.appendChild(
		document.createTextNode(`* {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		-ms-transition: none !important;
		transition: none !important;
	}`)
	);
	return styleElement;
}

// Perform a task without any css transitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withoutTransition(action: () => any) {
	if (typeof document === "undefined") return;

	// Skip transition disabling on initial load
	if (!hasLoaded) {
		hasLoaded = true;
		// defer action to avoid blocking initial render
		if (typeof window.requestAnimationFrame !== "undefined") {
			window.requestAnimationFrame(action);
		} else {
			setTimeout(action, 0);
		}
		return;
	}

	clearTimeout(timeoutAction);
	clearTimeout(timeoutEnable);

	const style = getStyleElement();
	const disable = () => document.head.appendChild(style);
	const enable = () => {
		if (style.parentNode) {
			document.head.removeChild(style);
		}
	};

	// Use requestAnimationFrame for better performance
	if (typeof window.requestAnimationFrame !== "undefined") {
		disable();
		// defer action to next frame to avoid blocking
		window.requestAnimationFrame(() => {
			action();
			// defer enable to ensure action completes
			window.requestAnimationFrame(enable);
		});
		return;
	}

	// Fallback for older browsers
	disable();
	timeoutAction = window.setTimeout(() => {
		action();
		timeoutEnable = window.setTimeout(enable, 16); // ~1 frame at 60fps
	}, 16);
}
