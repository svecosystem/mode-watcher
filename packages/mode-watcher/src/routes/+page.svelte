<script lang="ts">
	import {
		mode,
		resetMode,
		setMode,
		systemPrefersMode,
		theme,
		toggleMode,
		userPrefersMode,
	} from "$lib/index.js";
	import { isBrowser } from "$lib/utils.js";

	const htmlElement = $derived.by(() => {
		mode.current;
		theme.current;
		if (!isBrowser) return;
		const htmlElement = document.documentElement;
		if (htmlElement) {
			return htmlElement.outerHTML.replace(`${htmlElement.innerHTML}</html>`, "");
		}
	});

	const themeColorElement = $derived.by(() => {
		mode.current;
		if (!isBrowser) return;
		const themeColorElement = document.querySelector('meta[name="theme-color"]');
		if (themeColorElement) {
			return themeColorElement.outerHTML;
		}
	});

	$effect.pre(() => {
		theme.current;
	});
</script>

<div class="container space-y-4 py-12">
	<p>User prefers mode: {userPrefersMode.current}</p>
	<p>System prefers mode: {systemPrefersMode.current}</p>
	<p>Current mode: {mode.current}</p>
	<p>Custom theme: {theme.current ? theme.current : "N/A"}</p>

	{#if htmlElement !== undefined}
		<pre>{htmlElement}</pre>
	{/if}
	{#if themeColorElement !== undefined}
		<pre>{themeColorElement}</pre>
	{/if}

	<button
		class="bg-primary text-background rounded-sm px-2 py-1 transition-colors duration-500"
		onclick={toggleMode}
	>
		Toggle
	</button>
	<button
		class="bg-primary text-background rounded-sm px-2 py-1 transition-colors duration-500"
		onclick={() => setMode("light")}
	>
		Light Mode
	</button>
	<button
		class="bg-primary text-background rounded-sm px-2 py-1 transition-colors duration-500"
		onclick={() => setMode("dark")}
	>
		Dark Mode
	</button>
	<button
		class="bg-primary text-background rounded-sm px-2 py-1 transition-colors duration-500"
		onclick={() => setMode("system")}
	>
		System Mode
	</button>
	<button
		class="bg-primary text-background rounded-sm px-2 py-1 transition-colors duration-500"
		onclick={resetMode}
	>
		Reset
	</button>
</div>
