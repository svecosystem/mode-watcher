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
			href: "https://svecosystem.com",
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
					title: "Configuration",
					href: "/docs/guide/configuration",
					items: [],
				},
				{
					title: "Components",
					href: "/docs/guide/components",
					items: [],
				},
				{
					title: "Code Blocks",
					href: "/docs/guide/code-blocks",
					items: [],
				},
			],
		},
	],
};
