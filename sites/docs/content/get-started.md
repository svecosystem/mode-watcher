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

Install the `mode-watcher` package from npm.

```bash
npm install mode-watcher
```

<Step>Add the ModeWatcher component</Step>

Add the `<ModeWatcher />` component to your root `+layout.svelte` file.

```svelte {2,5}#add title="src/routes/+layout.svelte"
<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />
```

<Step>That's it!</Step>

You're now ready to use Mode Watcher in your Svelte app.

Here's an example of how to use the `toggleMode` function to toggle the mode:

```svelte title="src/lib/components/light-switch.svelte"
<script lang="ts">
	import { toggleMode } from "mode-watcher";
</script>

<button on:click={toggleMode}>Toggle Mode</button>
```

For additional information and configuration, please refer to the [API reference](/docs/api-reference/mode-watcher).

</Steps>
