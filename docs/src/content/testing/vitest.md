---
title: Vitest
description: How to test with vitest
section: Testing
---

When testing components that use mode-watcher, you'll need to set up a proper testing environment that mocks the `matchMedia` API. This guide will show you how to properly configure your tests.

## Setup

Create a `vitest.setup.ts` file in your project root (or wherever you keep your test configuration) and add the following code:

```ts
import { vi } from "vitest";

const mockMatchMedia = vi.fn().mockImplementation((query) => ({
	matches: false,
	media: query,
	onchange: null,
	addEventListener: vi.fn(),
	removeEventListener: vi.fn(),
	dispatchEvent: vi.fn(),
	// Additional properties to better match the MediaQueryList interface
	matchMedia: true,
	mediaQueryList: true,
	// Method to simulate media query changes
	simulateChange: (matches: boolean) => {
		mockMatchMedia.mock.results[0].value.matches = matches;
		if (mockMatchMedia.mock.results[0].value.onchange) {
			mockMatchMedia.mock.results[0].value.onchange();
		}
	},
}));

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: mockMatchMedia,
});
```

Then, update your `vitest.config.ts` to include this setup file:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: ["./vitest.setup.ts"],
		// ... other config options
	},
});
```

## Usage in Tests

With the setup in place, you can now write tests for components that use mode-watcher. Here's an example:

```ts
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import YourComponent from "./YourComponent.svelte";

describe("YourComponent", () => {
	it("should render in light mode by default", () => {
		const { container } = render(YourComponent);
		// Your assertions here
	});
});
```

## Important Notes

1. The mock implementation must be set up before any components are rendered that use mode-watcher.
2. The `simulateChange` method allows you to programmatically trigger media query changes in your tests.
3. Make sure to clean up any event listeners in your `afterEach` or `afterAll` blocks if needed.

## Troubleshooting

If you encounter issues with the `matchMedia` mock not working as expected:

1. Verify that your `vitest.setup.ts` file is properly configured in your `vitest.config.ts`
2. Ensure that the mock is set up before any components are rendered
3. Check that you're using the latest version of mode-watcher, as the implementation details may change between versions
