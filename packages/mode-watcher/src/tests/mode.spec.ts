import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Mode from './Mode.svelte';
import StealthMode from './StealthMode.svelte';
import userEvent from '@testing-library/user-event';
import { mediaQueryState } from '../../scripts/setupTest';
import { tick } from 'svelte';

it('renders mode', async () => {
	const { container } = render(Mode);
	const rootEl = container.parentElement;
	const classes = getClasses(rootEl);
	expect(classes).toContain('dark');
});

it('toggles the mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;

	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	const toggle = getByTestId('toggle');
	await userEvent.click(toggle);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');
	await userEvent.click(toggle);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
});

it('allows the user to set the mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	const light = getByTestId('light');
	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');

	const dark = getByTestId('dark');
	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
});

it('keeps the mode store in sync with current mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const light = getByTestId('light');
	const dark = getByTestId('dark');
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	expect(mode.textContent).toBe('dark');

	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');
	expect(mode.textContent).toBe('light');

	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
	expect(mode.textContent).toBe('dark');
});

it('resets the mode to system preferences', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const light = getByTestId('light');
	const reset = getByTestId('reset');
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	expect(mode.textContent).toBe('dark');

	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');
	expect(mode.textContent).toBe('light');

	await userEvent.click(reset);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
	expect(mode.textContent).toBe('dark');
});

it('tracks changes to system preferences', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = true;
	const changeEvent = new Event('change');
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');
	expect(mode.textContent).toBe('light');

	mediaQueryState.matches = false;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
	expect(mode.textContent).toBe('dark');
});

it('stops tracking changes to system preferences when user sets a mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const light = getByTestId('light');
	const reset = getByTestId('reset');
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = true;
	const changeEvent = new Event('change');
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');
	expect(mode.textContent).toBe('light');

	mediaQueryState.matches = false;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
	expect(mode.textContent).toBe('dark');

	await userEvent.click(light);
	const classes4 = getClasses(rootEl);
	const colorScheme4 = getColorScheme(rootEl);
	const themeColor4 = getThemeColor(rootEl);
	expect(classes4).not.toContain('dark');
	expect(colorScheme4).toBe('light');
	expect(themeColor4).toBe('white');
	expect(mode.textContent).toBe('light');

	mediaQueryState.matches = true;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes5 = getClasses(rootEl);
	const colorScheme5 = getColorScheme(rootEl);
	const themeColor5 = getThemeColor(rootEl);
	expect(classes5).not.toContain('dark');
	expect(colorScheme5).toBe('light');
	expect(themeColor5).toBe('white');
	expect(mode.textContent).toBe('light');

	mediaQueryState.matches = false;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes6 = getClasses(rootEl);
	const colorScheme6 = getColorScheme(rootEl);
	const themeColor6 = getThemeColor(rootEl);
	expect(classes6).not.toContain('dark');
	expect(colorScheme6).toBe('light');
	expect(themeColor6).toBe('white');
	expect(mode.textContent).toBe('light');

	await userEvent.click(reset);
	const classes7 = getClasses(rootEl);
	const colorScheme7 = getColorScheme(rootEl);
	const themeColor7 = getThemeColor(rootEl);
	expect(classes7).toContain('dark');
	expect(colorScheme7).toBe('dark');
	expect(themeColor7).toBe('black');
	expect(mode.textContent).toBe('dark');
});

it('does not track changes to system preference when track prop is set to false', async () => {
	const { container, getByTestId } = render(Mode, { track: false });
	const rootEl = container.parentElement;
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = true;
	const changeEvent = new Event('change');
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).toContain('dark');
	expect(colorScheme2).toBe('dark');
	expect(themeColor2).toBe('black');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = false;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
	expect(mode.textContent).toBe('dark');
});

it('also works when $mode is not used in the current page', async () => {
	const { container, getByTestId } = render(StealthMode);
	const rootEl = container.parentElement;

	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	const themeColor = getThemeColor(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(themeColor).toBe('black');
	const toggle = getByTestId('toggle');
	await userEvent.click(toggle);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	const themeColor2 = getThemeColor(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(themeColor2).toBe('white');
	await userEvent.click(toggle);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	const themeColor3 = getThemeColor(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(themeColor3).toBe('black');
});

function getClasses(element: HTMLElement | null): string[] {
	if (element === null) {
		return [];
	}
	const classes = element.className.split(' ').filter((c) => c.length > 0);
	return classes;
}

function getColorScheme(element: HTMLElement | null) {
	if (element === null) {
		return '';
	}
	return element.style.colorScheme;
}

function getThemeColor(element: HTMLElement | null) {
	if (element === null) {
		return '';
	}

	const themeMetaEl = element.querySelector('meta[name="theme-color"]');
	if (themeMetaEl === null) {
		return '';
	}

	const content = themeMetaEl.getAttribute('content');
	if (content === null) {
		return '';
	}

	return content;
}
