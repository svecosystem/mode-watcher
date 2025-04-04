<script lang="ts">
	import SvecosystemDark from "$lib/components/logos/svecosystem-dark.svelte";
	import SvecosystemLight from "$lib/components/logos/svecosystem-light.svelte";
	import { DocsLayout } from "@svecodocs/kit";
	import { navigation } from "$lib/navigation";

	let { children } = $props();
</script>

<DocsLayout {navigation}>
	{#snippet logo()}
		<SvecosystemDark class="hidden max-h-6 dark:block" />
		<SvecosystemLight class="block max-h-6 dark:hidden" />
		<span class="sr-only">Svecodocs</span>
	{/snippet}

	{@render children?.()}
</DocsLayout>
