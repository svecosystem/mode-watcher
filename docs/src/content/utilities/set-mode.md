---
title: setMode
description: Sets the current mode to "light", "dark", or "system".
section: Utilities
---

<script>
	import { Callout, PropField, Collapsible } from '@svecodocs/kit'
</script>

`setMode` is a function that updates the user's preferred mode.

It accepts one of three string values: `"light"`, `"dark"`, or `"system"`.

This updates both the visual mode and the persisted preference in `localStorage`. You can also pass it options to customize the behavior, such as applying it temporarily without persisting it to `localStorage`.

## Usage

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button onclick={() => setMode("light")}>Set Light Mode</button>
<button onclick={() => setMode("dark")}>Set Dark Mode</button>
```

You can also apply the mode temporarily (without persisting to `localStorage`) by passing the `temporaryOnly` option as `true`. This can be useful if you need to set the mode to a specific value for a specific part of your website. (ex: marketing part vs docs part, where in marketing part you want to set the mode to `light` and in docs part you want the user to choose the mode).

`(marketing) group - layout.svelte`

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";

	onMount(() => {
		setMode("light", { temporaryOnly: true });
	});
</script>
```

`(docs) group - layout.svelte`

```svelte
<script lang="ts">
	import { clearTemporaryMode } from "mode-watcher";

	onMount(() => {
		clearTemporaryMode();
	});
</script>
```

Then you get the marketing with light mode as you like, and the docs part will revert to the user's local storage preference!

## Options

The `setMode` utility accepts the following options:

<PropField name="temporaryOnly" type="boolean" defaultValue="false">
	Whether to apply the mode only temporarily (do not persist to `localStorage`).
</PropField>
