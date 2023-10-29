import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Mode from './Mode.svelte';
import userEvent from '@testing-library/user-event';
import { mediaQueryState } from './setup';
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
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	const toggle = getByTestId('toggle');
	await userEvent.click(toggle);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	await userEvent.click(toggle);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
});

it('allows the user to set the mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	const light = getByTestId('light');
	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');

	const dark = getByTestId('dark');
	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
});

it('keeps the mode store in sync with current mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const light = getByTestId('light');
	const dark = getByTestId('dark');
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(mode.textContent).toBe('dark');

	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(mode.textContent).toBe('light');

	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
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
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(mode.textContent).toBe('dark');

	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(mode.textContent).toBe('light');

	await userEvent.click(reset);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(mode.textContent).toBe('dark');
});

it('tracks changes to system preferences', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = true;
	const changeEvent = new Event('change');
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(mode.textContent).toBe('light');

	mediaQueryState.matches = false;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(mode.textContent).toBe('dark');
});

it('stops tracking changes to system preferences when user sets a mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const dark = getByTestId('dark');
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	const colorScheme = getColorScheme(rootEl);
	expect(classes).toContain('dark');
	expect(colorScheme).toBe('dark');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = true;
	const changeEvent = new Event('change');
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes2 = getClasses(rootEl);
	const colorScheme2 = getColorScheme(rootEl);
	expect(classes2).not.toContain('dark');
	expect(colorScheme2).toBe('light');
	expect(mode.textContent).toBe('light');

	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	const colorScheme3 = getColorScheme(rootEl);
	expect(classes3).toContain('dark');
	expect(colorScheme3).toBe('dark');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = false;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes4 = getClasses(rootEl);
	const colorScheme4 = getColorScheme(rootEl);
	expect(classes4).toContain('dark');
	expect(colorScheme4).toBe('dark');
	expect(mode.textContent).toBe('dark');

	mediaQueryState.matches = true;
	window.matchMedia('(prefers-color-scheme: light)').dispatchEvent(changeEvent);
	await tick();
	const classes5 = getClasses(rootEl);
	const colorScheme5 = getColorScheme(rootEl);
	expect(classes5).toContain('dark');
	expect(colorScheme5).toBe('dark');
	expect(mode.textContent).toBe('dark');
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
