/**
 * Santizes an array of classnames by removing any empty strings.
 */
export function sanitizeClassNames(classNames: string[]): string[] {
	return classNames.filter((className) => className.length > 0);
}
