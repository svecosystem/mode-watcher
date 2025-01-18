import { BROWSER } from "esm-env";
import { on } from "svelte/events";
import { createSubscriber } from "svelte/reactivity";

export class ReactiveLocalStorage {
	readonly key: string;
	#current: string | null = $state(null);

	constructor(key: string) {
		this.key = key;

		if (BROWSER) {
			this.#current = localStorage.getItem(key);
		}
	}

	readonly #subscribe = createSubscriber(() => {
		return on(window, "storage", this.#handleStorageEvent);
	});

	readonly #handleStorageEvent = (event: StorageEvent) => {
		if (event.key === this.key) {
			this.#current = event.newValue;
		}
	};

	get current() {
		this.#subscribe();
		return this.#current;
	}

	set current(value) {
		this.#current = value;

		if (BROWSER) {
			if (value === null) {
				localStorage.removeItem(this.key);
			} else {
				localStorage.setItem(this.key, value);
			}
		}
	}
}
