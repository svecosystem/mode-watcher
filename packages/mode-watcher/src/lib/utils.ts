/**
 * Sanitizes an array of classnames by removing any empty strings.
 */
export function sanitizeClassNames(classNames: string[]): string[] {
	return classNames.filter((className) => className.length > 0);
}

export const noopStorage = {
	getItem: (_key: string) => null,
	setItem: (_key: string, _value: string) => {},
};

export const isBrowser = typeof document !== "undefined";
