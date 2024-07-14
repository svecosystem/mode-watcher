import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";
import type { Plugin } from "vite";

const vitestBrowserConditionPlugin: Plugin = {
	name: "vite-plugin-vitest-browser-condition",
	//@ts-expect-error - this works
	config({ resolve }: { resolve: { conditions: string[] } }) {
		if (process.env.VITEST) {
			resolve.conditions.unshift("browser");
		}
	},
};

export default defineConfig({
	plugins: [vitestBrowserConditionPlugin, sveltekit(), svelteTesting()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		// jest like globals
		globals: true,
		environment: "jsdom",
		// in-source testing
		includeSource: ["src/**/*.{js,ts,svelte}"],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ["./scripts/setupTest.ts"],
		// Exclude files in v8
		coverage: {
			exclude: ["setupTest.ts"],
		},
		alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
		mockReset: false,
	},
});
