import { defineSiteConfig } from "@svecodocs/kit";

export const siteConfig = defineSiteConfig({
	name: "Mode Watcher",
	url: "https://mode-watcher.sveco.dev",
	ogImage: {
		url: "https://mode-watcher.sveco.dev/og.png",
		height: "630",
		width: "1200",
	},
	description: "Simple light/dark mode and theme management for Svelte apps.",
	author: "Huntabyte",
	keywords: [
		"svelte",
		"sveltekit",
		"dark mode",
		"themes",
		"light mode",
		"theme switcher",
		"theme toggle",
		"mode watcher",
	],
	license: {
		name: "MIT",
		url: "https://github.com/svecosystem/mode-watcher/blob/main/LICENSE",
	},
	links: {
		x: "https://x.com/huntabyte",
		github: "https://github.com/svecosystem/mode-watcher",
	},
});
