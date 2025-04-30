import { PersistedState, watch } from "runed";
import { themeStorageKey } from "./storage-keys.svelte.js";
import { isBrowser, noopStorage } from "./utils.js";

class CustomTheme {
	#storage = isBrowser ? localStorage : noopStorage;
	#initialValue = this.#storage.getItem(themeStorageKey.current);
	#value =
		this.#initialValue === null || this.#initialValue === undefined ? "" : this.#initialValue;
	#persisted = $state(this.#makePersisted());

	#makePersisted(value: string = this.#value) {
		return new PersistedState<string>(themeStorageKey.current, value, {
			serializer: {
				serialize: (v) => {
					if (typeof v !== "string") return "";
					return v;
				},
				deserialize: (v) => v,
			},
		});
	}

	constructor() {
		$effect.root(() => {
			return watch.pre(
				() => themeStorageKey.current,
				(_, prevStorageKey) => {
					const currModeValue = this.#persisted.current;
					this.#persisted = this.#makePersisted(currModeValue);
					if (prevStorageKey) {
						localStorage.removeItem(prevStorageKey);
					}
				}
			);
		});
	}

	/**
	 * The current theme.
	 * @returns The current theme.
	 */
	get current() {
		return this.#persisted.current;
	}

	/**
	 * Set the current theme.
	 * @param newValue The new theme to set.
	 */
	set current(newValue: string) {
		this.#persisted.current = newValue;
	}
}

/**
 * A custom theme to apply and persist to the root `html` element.
 */
export const customTheme = new CustomTheme();
