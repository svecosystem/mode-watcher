import { BROWSER } from "esm-env";
import { MediaQuery } from "svelte/reactivity";
import { extract, type MaybeGetter } from "./internal/extract.js";
import { ReactiveLocalStorage } from "./internal/local-storage.svelte.js";
import { withoutTransitions } from "./internal/without-transitions.js";

export type ThemeColors = {
	light: string;
	dark: string;
};

export type Mode = "light" | "dark" | "system";

export type DerivedMode = "light" | "dark";

export type ModeWatcherProps = {
	track?: MaybeGetter<boolean | undefined>;

	defaultMode?: MaybeGetter<Mode | undefined>;

	defaultTheme?: MaybeGetter<string | null | undefined>;

	themeColors?: MaybeGetter<ThemeColors | null | undefined>;

	disableTransitions?: MaybeGetter<boolean | undefined>;

	darkClassNames?: MaybeGetter<string[] | undefined>;

	lightClassNames?: MaybeGetter<string[] | undefined>;

	modeStorageKey?: MaybeGetter<string | undefined>;

	themeStorageKey?: MaybeGetter<string | undefined>;
};

export const prefersDarkColorScheme = new MediaQuery("prefers-color-scheme: dark");

export class ModeWatcher {
	readonly #props: ModeWatcherProps;

	constructor(props: ModeWatcherProps = {}) {
		this.#props = props;
	}

	readonly track: boolean = $derived.by(() => extract(this.#props.track, false));

	readonly defaultMode: Mode = $derived.by(() => extract(this.#props.defaultMode, "system"));

	readonly defaultTheme: string | null = $derived.by(() => extract(this.#props.defaultTheme, null));

	readonly themeColors: ThemeColors | null = $derived.by(() =>
		extract(this.#props.themeColors, null)
	);

	readonly disableTransitions: boolean = $derived.by(() =>
		extract(this.#props.disableTransitions, false)
	);

	readonly darkClassNames: string[] = $derived.by(() => extract(this.#props.darkClassNames, []));

	readonly lightClassNames: string[] = $derived.by(() => extract(this.#props.lightClassNames, []));

	readonly modeStorageKey: string = $derived.by(() =>
		extract(this.#props.modeStorageKey, "mode-watcher-mode")
	);

	readonly themeStorageKey: string = $derived.by(() =>
		extract(this.#props.modeStorageKey, "mode-watcher-theme")
	);

	readonly #modeStorage = $derived.by(() => new ReactiveLocalStorage(this.modeStorageKey));

	readonly #userPrefersMode = $derived.by(() =>
		validateMode(this.#modeStorage.current, this.defaultMode)
	);

	get userPrefersMode(): Mode {
		return this.#userPrefersMode;
	}

	set userPrefersMode(value: Mode) {
		this.#modeStorage.current = value;
	}

	readonly mode?: DerivedMode = $derived.by(() => {
		if (!BROWSER) {
			return;
		}

		let mode: DerivedMode;
		if (this.#userPrefersMode === "system") {
			mode = prefersDarkColorScheme.current ? "dark" : "light";
		} else {
			mode = this.#userPrefersMode;
		}

		if (this.disableTransitions) {
			withoutTransitions(() => updateDocumentMode(mode, this));
		} else {
			updateDocumentMode(mode, this);
		}

		return mode;
	});

	readonly #themeStorage = $derived.by(() => new ReactiveLocalStorage(this.themeStorageKey));

	readonly #theme = $derived.by(() => {
		const theme = this.#themeStorage.current ?? this.defaultTheme;
		if (BROWSER) {
			if (this.disableTransitions) {
				withoutTransitions(() => updateDocumentTheme(theme));
			} else {
				updateDocumentTheme(theme);
			}
		}
		return theme;
	});

	get theme(): string | null {
		return this.#theme;
	}

	set theme(value: string | null) {
		this.#themeStorage.current = value;
	}
}

function validateMode(value: string | null, defaultValue: Mode): Mode {
	if (value === "light" || value === "dark" || value === "system") {
		return value;
	}
	return defaultValue;
}

function updateDocumentMode(mode: DerivedMode, watcher: ModeWatcher) {
	const htmlEl = document.documentElement;
	const themeColorEl = document.querySelector('meta[name="theme-color"]');

	const themeColors = watcher.themeColors;
	const darkClassNames = sanitizeClassNames(watcher.darkClassNames);
	const lightClassNames = sanitizeClassNames(watcher.lightClassNames);

	switch (mode) {
		case "light": {
			htmlEl.classList.add(...lightClassNames);
			htmlEl.classList.remove(...darkClassNames);
			htmlEl.style.colorScheme = "light";

			if (themeColors === null) {
				themeColorEl?.removeAttribute("content");
			} else {
				themeColorEl?.setAttribute("content", themeColors.light);
			}
			break;
		}
		case "dark": {
			htmlEl.classList.add(...darkClassNames);
			htmlEl.classList.remove(...lightClassNames);
			htmlEl.style.colorScheme = "dark";

			if (themeColors === null) {
				themeColorEl?.removeAttribute("content");
			} else {
				themeColorEl?.setAttribute("content", themeColors.dark);
			}
			break;
		}
		default: {
			// Exhaustive check
			const _: never = mode;
		}
	}
}

function sanitizeClassNames(classNames: string[]): string[] {
	return classNames.filter((className) => className.length > 0);
}

function updateDocumentTheme(theme: string | null) {
	const htmlEl = document.documentElement;
	if (theme === null) {
		htmlEl.removeAttribute("data-theme");
	} else {
		htmlEl.setAttribute("data-theme", theme);
	}
}
