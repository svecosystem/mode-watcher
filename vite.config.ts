import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// jest like globals
		globals: true,
		environment: 'jsdom',
		// in-source testing
		includeSource: ['src/**/*.{js,ts,svelte}'],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ['src/tests/setup.ts'],
		// Exclude files in v8
		coverage: {
			exclude: ['src/tests/setup.ts']
		},
		alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }]
	}
});
