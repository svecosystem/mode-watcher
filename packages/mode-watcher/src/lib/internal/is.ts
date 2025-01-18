export function isFunction(value: unknown): value is () => unknown {
	return typeof value === "function";
}
