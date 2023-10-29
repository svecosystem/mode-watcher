export const mediaQueryState = {
	matches: false
};

const listeners: ((event: unknown) => void)[] = [];

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: mediaQueryState.matches,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn((type, callback) => {
			if (type === 'change') {
				listeners.push(callback);
			}
		}),
		removeEventListener: vi.fn((type, callback) => {
			const index = listeners.indexOf(callback);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		}),
		dispatchEvent: vi.fn((event) => {
			if (event.type === 'change') {
				for (const callback of listeners) {
					callback({
						matches: mediaQueryState.matches,
						media: '(prefers-color-scheme: light)'
					});
				}
			}
		})
	}))
});
