/**
 * A utility wrapper around `localStorage` to prevent
 * security errors or incorrect schemes.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage#exceptions|MDN}
 */
export const local = {
	get: (key: string, defaultValue: string | null = null) => {
		try {
			return localStorage.getItem(key);
		} catch {
			// disabled or unavailable
			return defaultValue;
		}
	},

	set: (key: string, value: string) => {
		try {
			localStorage.setItem(key, value);
		} catch {
			// disabled or unavailable
		}
	},

	remove: (key: string) => {
		try {
			localStorage.removeItem(key);
		} catch {
			// disabled or unavailable
		}
	},
};
