<script lang="ts">
	import "$lib/styles/markdown.pcss";
	import type { SvelteComponent } from "svelte";
	import type { PageData } from "./$types.js";
	import { PageHeader } from "$lib/components/layout/index.js";

	type Component = $$Generic<typeof SvelteComponent>;

	export let data: PageData;
	$: component = data.component as unknown as Component;
	$: doc = data.metadata;
</script>

<PageHeader.Root>
	{#if doc.tagline}
		<PageHeader.Tagline>{doc.tagline}</PageHeader.Tagline>
	{/if}
	<PageHeader.Heading>{doc.title}</PageHeader.Heading>
	<PageHeader.Description>{doc.description}</PageHeader.Description>
</PageHeader.Root>
<div class="markdown prose dark:prose-invert relative max-w-3xl pt-4" id="content">
	<svelte:component this={component} />
</div>
