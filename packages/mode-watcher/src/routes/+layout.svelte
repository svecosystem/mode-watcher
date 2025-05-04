<script lang="ts">
	import "../app.postcss";
	import ModeWatcher from "$lib/components/mode-watcher.svelte";

	let { children } = $props();
</script>

<ModeWatcher themeColors={{ dark: "black", light: "white" }} disableTransitions />
{@render children()}
