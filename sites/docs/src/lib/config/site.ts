export const siteConfig = {
	name: "Mode Watcher",
	url: "https://mode-watcher.svecosystem.com",
	description: "SSR-friendly light and dark mode for SvelteKit.",
	links: {
		x: "https://x.com/huntabyte",
		github: "https://github.com/svecosystem",
	},
	author: "Huntabyte",
	keywords:
		"SvelteKit dark mode,sveltekit modes,sveltekit lightswitch,ssr dark mode,svelte ssr dark mode,sveltekit ssr dark mode,svelte lightswitch,sveltekit themes,sveltekit toggle",
	ogImage: {
		url: "https://mode-watcher.svecosystem.com/og.png",
		width: "1200",
		height: "630",
	},
	license: {
		name: "MIT",
		url: "https://github.com/svecosystem/mode-watcher/blob/main/LICENSE",
	},
};

export type SiteConfig = typeof siteConfig;
