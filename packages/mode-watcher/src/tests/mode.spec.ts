import { render } from "@testing-library/svelte/svelte5";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { tick } from "svelte";
import { mediaQueryState } from "../../scripts/setupTest.js";
import Mode from "./Mode.svelte";
import StealthMode from "./StealthMode.svelte";
import type { ModeWatcherProps } from "$lib/types.js";

function setup(props: Partial<ModeWatcherProps> = {}) {
	const user = userEvent.setup();
	const returned = render(Mode, { props });
	const theme = returned.getByTestId("theme");
	const mode = returned.getByTestId("mode");
	const themeStorageKey = returned.getByTestId("theme-storage-key");
	const modeStorageKey = returned.getByTestId("mode-storage-key");
	const rootEl = returned.container.parentElement?.parentElement as HTMLElement;
	const themeDracula = returned.getByTestId("theme-dracula");
	const themeRetro = returned.getByTestId("theme-retro");
	const themeClear = returned.getByTestId("theme-clear");
	return {
		user,
		theme,
		mode,
		themeStorageKey,
		modeStorageKey,
		rootEl,
		themeDracula,
		themeRetro,
		themeClear,
		...returned,
	};
}

describe("mode-watcher", () => {
	afterEach(() => {
		localStorage.clear();
	});

	it("renders mode", async () => {
		const { rootEl } = setup();
		const classes = getClasses(rootEl);
		expect(classes).toContain("dark");
	});

	it("toggles the mode", async () => {
		const { getByTestId, user, rootEl } = setup();

		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		const toggle = getByTestId("toggle");
		await user.click(toggle);
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");
		await user.click(toggle);
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
	});

	it("allows the user to set the mode", async () => {
		const { getByTestId, user, rootEl } = setup();
		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		const light = getByTestId("light");
		await user.click(light);
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");

		const dark = getByTestId("dark");
		await user.click(dark);
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
	});

	it("keeps the mode store in sync with current mode", async () => {
		const { getByTestId, user, rootEl } = setup();
		const light = getByTestId("light");
		const dark = getByTestId("dark");
		const mode = getByTestId("mode");
		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		expect(mode.textContent).toBe("dark");

		await user.click(light);
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");
		expect(mode.textContent).toBe("light");

		await user.click(dark);
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
		expect(mode.textContent).toBe("dark");
	});

	it("resets the mode to system preferences", async () => {
		const { getByTestId, user, rootEl } = setup();
		const light = getByTestId("light");
		const reset = getByTestId("reset");
		const mode = getByTestId("mode");
		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		expect(mode.textContent).toBe("dark");

		await user.click(light);
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");
		expect(mode.textContent).toBe("light");

		await user.click(reset);
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
		expect(mode.textContent).toBe("dark");
	});

	// need to mock Svelte's media query somehow
	it.skip("tracks changes to system preferences", async () => {
		const { getByTestId, rootEl } = setup();
		const mode = getByTestId("mode");
		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		expect(mode.textContent).toBe("dark");

		mediaQueryState.matches = true;
		const changeEvent = new Event("change");
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");
		expect(mode.textContent).toBe("light");

		mediaQueryState.matches = false;
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
		expect(mode.textContent).toBe("dark");
	});

	// need to mock Svelte's media query somehow
	it.skip("stops tracking changes to system preferences when user sets a mode", async () => {
		const { getByTestId, user, rootEl } = setup();
		const light = getByTestId("light");
		const reset = getByTestId("reset");
		const mode = getByTestId("mode");
		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		expect(mode.textContent).toBe("dark");

		mediaQueryState.matches = true;
		const changeEvent = new Event("change");
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");
		expect(mode.textContent).toBe("light");

		mediaQueryState.matches = false;
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
		expect(mode.textContent).toBe("dark");

		await user.click(light);
		const classes4 = getClasses(rootEl);
		const colorScheme4 = getColorScheme(rootEl);
		const themeColor4 = getThemeColor(rootEl);
		expect(classes4).not.toContain("dark");
		expect(colorScheme4).toBe("light");
		expect(themeColor4).toBe("white");
		expect(mode.textContent).toBe("light");

		mediaQueryState.matches = true;
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes5 = getClasses(rootEl);
		const colorScheme5 = getColorScheme(rootEl);
		const themeColor5 = getThemeColor(rootEl);
		expect(classes5).not.toContain("dark");
		expect(colorScheme5).toBe("light");
		expect(themeColor5).toBe("white");
		expect(mode.textContent).toBe("light");

		mediaQueryState.matches = false;
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes6 = getClasses(rootEl);
		const colorScheme6 = getColorScheme(rootEl);
		const themeColor6 = getThemeColor(rootEl);
		expect(classes6).not.toContain("dark");
		expect(colorScheme6).toBe("light");
		expect(themeColor6).toBe("white");
		expect(mode.textContent).toBe("light");

		await user.click(reset);
		const classes7 = getClasses(rootEl);
		const colorScheme7 = getColorScheme(rootEl);
		const themeColor7 = getThemeColor(rootEl);
		expect(classes7).toContain("dark");
		expect(colorScheme7).toBe("dark");
		expect(themeColor7).toBe("black");
		expect(mode.textContent).toBe("dark");
	});

	// need to mock Svelte's media query
	it.skip("does not track changes to system preference when track prop is set to false", async () => {
		const { container, getByTestId } = render(Mode, { track: false });
		const rootEl = container.parentElement?.parentElement as HTMLElement;
		const mode = getByTestId("mode");
		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		expect(mode.textContent).toBe("dark");

		mediaQueryState.matches = true;
		const changeEvent = new Event("change");
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).toContain("dark");
		expect(colorScheme2).toBe("dark");
		expect(themeColor2).toBe("black");
		expect(mode.textContent).toBe("dark");

		mediaQueryState.matches = false;
		window.matchMedia("(prefers-color-scheme: light)").dispatchEvent(changeEvent);
		await tick();
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
		expect(mode.textContent).toBe("dark");
	});

	it("also works when $mode is not used in the current page", async () => {
		const user = userEvent.setup();
		const { container, getByTestId } = render(StealthMode);
		const rootEl = container.parentElement?.parentElement as HTMLElement;

		const classes = getClasses(rootEl);
		const colorScheme = getColorScheme(rootEl);
		const themeColor = getThemeColor(rootEl);
		expect(classes).toContain("dark");
		expect(colorScheme).toBe("dark");
		expect(themeColor).toBe("black");
		const toggle = getByTestId("toggle");
		await user.click(toggle);
		const classes2 = getClasses(rootEl);
		const colorScheme2 = getColorScheme(rootEl);
		const themeColor2 = getThemeColor(rootEl);
		expect(classes2).not.toContain("dark");
		expect(colorScheme2).toBe("light");
		expect(themeColor2).toBe("white");
		await user.click(toggle);
		const classes3 = getClasses(rootEl);
		const colorScheme3 = getColorScheme(rootEl);
		const themeColor3 = getThemeColor(rootEl);
		expect(classes3).toContain("dark");
		expect(colorScheme3).toBe("dark");
		expect(themeColor3).toBe("black");
	});

	it("allows the user to apply custom classnames to the root html element", async () => {
		const { getByTestId, user, rootEl } = setup({
			darkClassNames: ["custom-d-class"],
			lightClassNames: ["custom-l-class"],
		});

		const classes = getClasses(rootEl);
		expect(classes).toContain("custom-d-class");
		const toggle = getByTestId("toggle");
		await user.click(toggle);
		const classes2 = getClasses(rootEl);
		expect(classes2).toContain("custom-l-class");
	});

	it("allows the user to set a custom theme via the `defaultTheme` prop", async () => {
		const { theme, rootEl } = setup({
			defaultTheme: "dracula",
		});
		expect(rootEl).toHaveAttribute("data-theme", "dracula");
		expect(theme).toHaveTextContent("dracula");
	});

	it("allows the user to programmatically change the theme", async () => {
		const { themeDracula, theme, rootEl, user } = setup({
			defaultTheme: "money",
		});
		expect(rootEl).toHaveAttribute("data-theme", "money");
		await user.click(themeDracula);
		expect(rootEl).toHaveAttribute("data-theme", "dracula");
		expect(theme).toHaveTextContent("dracula");
	});

	it("allows the user to programmatically clear the theme", async () => {
		const { themeClear, rootEl, user } = setup({
			defaultTheme: "money",
		});
		expect(rootEl).toHaveAttribute("data-theme", "money");
		await user.click(themeClear);
		expect(rootEl).toHaveAttribute("data-theme", "");
		expect(rootEl).not.toHaveAttribute("data-theme", "money");
	});
});

function getClasses(element: HTMLElement | null): string[] {
	if (element === null) return [];
	const classes = element.className.split(" ").filter((c) => c.length > 0);
	return classes;
}

function getColorScheme(element: HTMLElement | null) {
	if (element === null) return "";
	return element.style.colorScheme;
}

function getThemeColor(element: HTMLElement | null) {
	if (element === null) return "";

	const themeMetaEl = element.querySelector('meta[name="theme-color"]');
	if (themeMetaEl === null) return "";

	const content = themeMetaEl.getAttribute("content");
	if (content === null) return "";

	return content;
}
