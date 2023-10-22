import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';
import Mode from './Mode.svelte';
import userEvent from '@testing-library/user-event';

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
	expect(classes).toContain('dark');
	const toggle = getByTestId('toggle');
	await userEvent.click(toggle);
	const classes2 = getClasses(rootEl);
	expect(classes2).not.toContain('dark');
	await userEvent.click(toggle);
	const classes3 = getClasses(rootEl);
	expect(classes3).toContain('dark');
});

it('allows the user to set the mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const classes = getClasses(rootEl);
	expect(classes).toContain('dark');
	const light = getByTestId('light');
	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	expect(classes2).not.toContain('dark');

	const dark = getByTestId('dark');
	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	expect(classes3).toContain('dark');
});

it('keeps the mode store in sync with current mode', async () => {
	const { container, getByTestId } = render(Mode);
	const rootEl = container.parentElement;
	const light = getByTestId('light');
	const dark = getByTestId('dark');
	const mode = getByTestId('mode');
	const classes = getClasses(rootEl);
	expect(classes).toContain('dark');
	expect(mode.textContent).toBe('dark');

	await userEvent.click(light);
	const classes2 = getClasses(rootEl);
	expect(classes2).not.toContain('dark');
	expect(mode.textContent).toBe('light');

	await userEvent.click(dark);
	const classes3 = getClasses(rootEl);
	expect(classes3).toContain('dark');
	expect(mode.textContent).toBe('dark');
});

function getClasses(element: HTMLElement | null): string[] {
	if (element === null) {
		return [];
	}
	const classes = element.className.split(' ').filter((c) => c.length > 0);
	return classes;
}
