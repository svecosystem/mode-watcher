<script lang="ts">
	import { DocsLayout } from "@svecodocs/kit";
	import { navigation } from "$lib/navigation";
	import ModeWatcherDark from "$lib/components/logos/mode-watcher-dark.svelte";
	import ModeWatcherLight from "$lib/components/logos/mode-watcher-light.svelte";

	let { children } = $props();
</script>

<DocsLayout {navigation}>
	{#snippet logo()}
		<ModeWatcherDark class="hidden max-h-6 dark:block" />
		<ModeWatcherLight class="block max-h-6 dark:hidden" />
		<span class="sr-only">Svecodocs</span>
	{/snippet}

	{@render children?.()}
</DocsLayout>
