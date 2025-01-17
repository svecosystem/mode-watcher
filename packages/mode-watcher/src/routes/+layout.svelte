<script lang="ts">
	import "../app.postcss";
	import ModeWatcher from "$lib/mode-watcher.svelte";

	const { children } = $props();
</script>

<ModeWatcher themeColors={{ dark: "black", light: "white" }} />
{@render children()}
