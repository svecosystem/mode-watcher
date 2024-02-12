---
title: Get Started
description: Start using Mode Watcher in your SvelteKit app.
tagline: Guide
---

<script>
	import { Steps, Step } from "$lib/components";
</script>

<Steps>
<Step>Install the package</Step>

You can install the project via `npm` or `pnpm`.

```bash
pnpm add mode-watcher
```

<Step>Add the ModeWatcher component</Step>

Add the `<ModeWatcher />` component to your root `+layout.svelte` file.

```svelte {2,5}#add
<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />
```

<Step>That's it!</Step>

You're ready to use Mode Watcher in your Svelte app.

Here's an example of how to use the `toggleMode` function to toggle the mode:

```svelte
<script lang="ts">
	import { toggleMode } from "mode-watcher";
</script>

<button on:click={toggleMode}>Toggle Mode</button>
```

For additional information and configuration, please refer to the [API reference](/docs/api-reference/mode-watcher).

</Steps>
