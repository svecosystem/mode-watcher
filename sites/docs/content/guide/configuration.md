---
title: Configuration
description: Learn how to get started with this template.
tagline: Guide
---

<script>
	import { Callout } from '$lib/components'
</script>

There isn't a ton of magic going on here, as this template was developed quickly to meet our own needs. The following sections will give you a brief overview of how the template is structured and how to get started.

## Site

The site config is used to define the site's title, description, metadata, and other information that is used throughout the site. The site config is defined in `src/lib/config/site.ts`.

Here's an example of what the `site.ts` file looks like:

```ts title="src/lib/config/site.ts"
export const siteConfig = {
	name: "Svecosystem Docs Starter",
	url: "https://svecosystem.com",
	description: "Componentized & accessible forms for SvelteKit.",
	links: {
		twitter: "https://twitter.com/huntabyte",
		github: "https://github.com/svecosystem",
	},
	author: "Huntabyte",
	keywords: "Svelte ecosystem,ecosystem,svecosystem,sveltekit,svelte libraries",
	ogImage: {
		url: "https://www.svecosystem.com/og.png",
		width: "1200",
		height: "630",
	},
};
```

## Navigation

Navigation for the various components (navbar, sidebar, etc.) is defined in a single file, `src/lib/config/navigation.ts`. The `main` navigation items are rendered in the top navigation bar, while the `sidebar` navigation items are rendered in the sidebar.

Here's an example of what the `navigation.ts` file looks like:

```ts title="src/lib/config/navigation.ts"
export const navigation: Navigation = {
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
	sidebar: [
		{
			title: "Overview",
			items: [
				{
					title: "Introduction",
					href: "/docs/introduction",
					items: [],
				},
				{
					title: "Getting Started",
					href: "/docs/getting-started",
					items: [],
				},
				{
					title: "Components",
					href: "/docs/components",
					items: [],
				},
			],
		},
		{
			title: "API Reference",
			items: [
				{
					title: "Root",
					href: "/docs/api-reference/root",
					items: [],
				},
			],
		},
	],
};
```

When links are marked as `external`, they will open in a new tab when clicked.

<Callout>
	The design of this template only supports a single level of navigation! If you need to support more, you'll need to modify the sidebar component to support it.
</Callout>

## Meta Tags

Meta tags are defined in the `src/lib/components/metadata.svelte` component. This component is used in the root layout component, `src/routes/+layout.svelte` to render the meta tags for each page.

```svelte title="src/lib/components/metadata.svelte"
<script lang="ts">
	import { page } from "$app/stores";
	import { siteConfig } from "$lib/config/site";

	export let title: string = siteConfig.name;

	$: title = $page.data?.title
		? `${$page.data.title} - ${siteConfig.name}`
		: siteConfig.name;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords} />
	<meta name="author" content={siteConfig.author} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={siteConfig.url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content="https://shadcn-svelte.com/og.png" />
	<meta name="twitter:image:alt" content={siteConfig.name} />
	<meta name="twitter:creator" content={siteConfig.author} />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={siteConfig.url + $page.url.pathname} />
	<meta property="og:image" content={siteConfig.ogImage.url} />
	<meta property="og:image:alt" content={siteConfig.name} />
	<meta property="og:image:width" content={siteConfig.ogImage.width} />
	<meta property="og:image:height" content={siteConfig.ogImage.height} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content="EN_US" />
	<link rel="shortcut icon" href="/favicon-16x16.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>
```

Any meta tags could be modified by frontmatter in the markdown file, which would be returned in the `$page.data` object, and then could be used here. At the moment, the only meta tag that is modified by frontmatter on a per-route basis is the `title` tag.

## Content

The markdown files that are used to generate the documentation are stored in the `content` directory. Each markdown file is a page in the documentation, and the directory structure is followed for navigation.

Here's an example of what the `content` directory looks like:

```txt
content
├── api-reference
│   └── root.md
├── components
│   └── tabs.md
├── docs
│   ├── components.md
│   ├── example.md
│   ├── getting-started.md
│   ├── index.md
│   └── introduction.md
├── index.md
```

You can use Svelte components in your markdown files by importing them as you would in any other Svelte file. We've also included a few pre-built components that you can use within the docs. Learn more about them in the [Components](/docs/components) section.
