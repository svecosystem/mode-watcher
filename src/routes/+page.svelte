<script lang="ts">
	import { toggleMode, setMode, resetMode, userPrefersMode, systemPrefersMode, mode } from '$lib';
</script>

<div class="container py-12 space-y-4">
	<p>User prefers mode: {$userPrefersMode}</p>
	<p>System prefers mode: {$systemPrefersMode}</p>
	<p>Current mode: {$mode}</p>
	<button on:click={toggleMode}> Toggle </button>
	<button on:click={() => setMode('light')}> Light Mode </button>
	<button on:click={() => setMode('dark')}> Dark Mode </button>
	<button on:click={resetMode}> Reset </button>
</div>

<style lang="postcss">
	button {
		@apply bg-primary transition-colors text-background px-2 py-1 rounded-sm duration-500;
	}
</style>
