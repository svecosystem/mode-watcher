---
title: Components
description: Pre-built components to use within the docs.
tagline: Guide
---

<script>
	import { Tabs, TabItem, Callout, Step, Steps, IconGrid } from '$lib/components'
</script>

The Svecosystem starter template ships with a few pre-built components that you can use within the docs. These components are built using [Svelte](https://svelte.dev), [Tailwind CSS](https://tailwindcss.com), and [shadcn-svelte](https://shadcn-svelte.com).

## Using a component

To use a component, simply import it from it's respective location and use it in the Markdown file.

```svelte title="content/docs/example.md"
<script>
	import { SomeComponent } from "$lib/components";
</script>

<!-- prettier-ignore -->
<SomeComponent>
	Hello
</SomeComponent>
```

## Built-in components

Here's a list of the built-in components you can start using right away. We'll add more components on an as-needed basis and will update this page accordingly.

### Tabs

You can use the `Tabs` and `TabItem` components to create a tabbed interface. Each `<TabItem>` must contain a `label` prop that will be used as the tab's label.

```svelte title="content/docs/example.md"
<script>
	import { Tabs, TabItem } from "$lib/components";
</script>

<Tabs>
	<TabItem label="First tab">This is the first tab's content.</TabItem>
	<TabItem label="Second tab">This is the second tab's content.</TabItem>
</Tabs>
```

The above code will render the following:

<Tabs>
	<TabItem label="First tab">This is the first tab's content.</TabItem>
	<TabItem label="Second tab">This is the second tab's content.</TabItem>
</Tabs>

### Callouts

Callouts (also known as "admonitions") are used to highlight a block of text.

There are four types of callouts available: `'note'`, `'warning'`, `'danger'`, and `'tip'`.

```svelte title="content/docs/example.md"
<script>
	import { Callout } from "$lib/components";
</script>

<Callout type="note" title="Note">
	This is a note, used to highlight important information or provide additional
	context. You can use markdown in here as well! Just ensure you include a space
	between the component and the content in your Markdown file.
</Callout>
```

The above code will render the following:

<Callout type="note" title="Note">

This is a note, used to highlight important information or provide additional context. You can use Markdown in here as well! Just ensure you include a space between the component and the content in your Markdown file.

</Callout>

Here are the other types of callouts:

<Callout type="danger" title="Danger">

This is a danger callout.

</Callout>

<Callout type="tip" title="Tip">

This is a tip callout.

</Callout>

<Callout type="warning" title="Warning">

This is a warning callout.

```ts
// This is a code block within a callout.

console.log("Hello, world!");
```

</Callout>

### Steps

Steps are great for showing a list of steps to complete a task. Use the `<Steps />` and `<Step />` components to create a list of steps in the docs.

```svelte title="content/docs/example.md"
<script>
	import { Steps, Step } from "$lib/components";
</script>

<Steps>
	<Step>Install the package</Step>

	You can install the project via `npm` or `pnpm`.

	<!-- Code block here -->

	<Step>Start your engines</Step>

	You can start the project by running `npm run dev` or `pnpm run dev`.

	<!-- Code block here -->
</Steps>
```

The above code will render the following:

<Steps>

<Step tocIgnore>Install the package</Step>

You can install the project via `npm` or `pnpm`.

```sh
pnpm install -D myproject
```

<Step tocIgnore>Start your engines</Step>

You can start the project by running `npm run dev` or `pnpm run dev`.

```sh
pnpm run dev
```

</Steps>

### Icons

We use [Phosphor Icons](https://phosphoricons.com/) for most of our icons, except a few custom logos. You can use any of the icons in the library, however, they should be reexported from the `src/lib/icons/index.ts` file. The project exports a few icons by default, but you can add more as needed.

The reasoning behind re-exporting the icons is for one, to allow us to easily switch icon libraries in the future if needed, and two, it improves the development server's performance by only importing the icons that are actually used in the project. If we were to import from `"phosphor-svelte"` directly, the entire icon library would be optimized by Vite, which would increase the development server's startup time.

Here's what a re-export looks like:

```ts title="src/lib/icons/index.ts"
export { default as ArrowUpRight } from "phosphor-svelte/lib/ArrowUpRight";
```

Here's all the icons that are currently exported by default, and can be imported into your markdown files from `$lib/icons`:

<IconGrid />
