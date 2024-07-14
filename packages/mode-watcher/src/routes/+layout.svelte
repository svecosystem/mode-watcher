<script lang="ts">
	import "../app.postcss";
	import ModeWatcher from "$lib/mode-watcher.svelte";
</script>

<ModeWatcher themeColors={{ dark: "black", light: "white" }} />
<slot />
