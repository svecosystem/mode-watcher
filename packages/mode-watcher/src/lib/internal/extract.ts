import { isFunction } from "./is.js";

export type MaybeGetter<T> = T | (() => T);

export function extract<T>(value: MaybeGetter<T>): T;
export function extract<T>(value: MaybeGetter<T | undefined>, defaultValue: T): T;
export function extract<T>(value: MaybeGetter<T>, defaultValue?: T) {
	const extracted = isFunction(value) ? value() : value;
	return extracted === undefined ? defaultValue : extracted;
}
