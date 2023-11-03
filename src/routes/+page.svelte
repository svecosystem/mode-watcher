<script lang="ts">
	import { toggleMode, mode } from '$lib';
</script>

<div class="container py-12">
	<p>Current Mode: {$mode}</p>
	<button
		on:click={toggleMode}
		class="bg-primary transition-colors text-background px-2 py-1 rounded-sm duration-500"
		>Toggle Mode</button
	>
</div>
