import type { Mode } from "./types.js";

/**
 * the modes that are supported, used for validation & type
 * derivation
 */
export const modes = ["dark", "light", "system"] as const;

export function isValidMode(value: unknown): value is Mode {
	if (typeof value !== "string") return false;
	return modes.includes(value as Mode);
}
