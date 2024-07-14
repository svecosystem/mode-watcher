export type NavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
};

export type SidebarNavItem = NavItem & {
	items: SidebarNavItem[];
	collapsible?: boolean;
};

export type NavItemWithChildren = NavItem & {
	items: NavItemWithChildren[];
};

export type Navigation = {
	main: NavItem[];
	sidebar: SidebarNavItem[];
};

export const navigation: Navigation = {
	// By default, `main` navigation items are rendered in the top navigation bar.
	main: [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Svecosystem",
			href: "https://github.com/svecosystem",
			external: true,
		},
		{
			title: "Releases",
			href: "https://github.com/svecosystem/mode-watcher/releases",
			external: true,
		},
	],
	// By default, `sidebar` navigation only supports 2 levels of navigation.
	sidebar: [
		{
			title: "Guide",
			collapsible: true,
			items: [
				{
					title: "Introduction",
					href: "/docs",
					items: [],
				},
				{
					title: "Get Started",
					href: "/docs/get-started",
					items: [],
				},
			],
		},
		{
			title: "API Reference",
			collapsible: true,
			items: [
				{
					title: "<ModeWatcher />",
					href: "/docs/api-reference/mode-watcher",
					items: [],
				},
				{
					title: "setMode",
					href: "/docs/api-reference/set-mode",
					items: [],
				},
				{
					title: "toggleMode",
					href: "/docs/api-reference/toggle-mode",
					items: [],
				},
				{
					title: "mode",
					href: "/docs/api-reference/mode",
					items: [],
				},
				{
					title: "systemPrefersMode",
					href: "/docs/api-reference/system-prefers-mode",
					items: [],
				},
				{
					title: "userPrefersMode",
					href: "/docs/api-reference/user-prefers-mode",
					items: [],
				},
				{
					title: "localStorageKey",
					href: "/docs/api-reference/local-storage-key",
					items: [],
				},
				{
					title: 'setTheme',
					href: '/docs/api-reference/set-theme',
					items: []
				},
				{
					title: 'theme',
					href: '/docs/api-reference/theme',
					items: []
				},
				{
					title: 'themeLocalStorageKey',
					href: '/docs/api-reference/theme-local-storage-key',
					items: []
				}
			],
		},
	],
};
