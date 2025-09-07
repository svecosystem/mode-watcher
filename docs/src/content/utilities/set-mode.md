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

This updates both the visual mode and the persisted preference in `localStorage`. You can also pass it options to customize the behavior, such as wether or not to persist it to `localStorage`.

## Usage

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button onclick={() => setMode("light")}>Set Light Mode</button>
<button onclick={() => setMode("dark")}>Set Dark Mode</button>
```

You can also not persist the mode to `localStorage` by passing the `persist` option as `false`. This can be useful if you need to set the mode to a specific value for a specific part of your website. (ex: marketing part vs docs part, where in marketing part you want to set the mode to `light` and in docs part you want the user to choose the mode).

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button onclick={() => setMode("light", { persist: false })}>
	Set Light Mode Only for this session!
</button>
```

## Options

The `setMode` utility accepts the following options:

<PropField name="persist" type="boolean" defaultValue="true">
	Whether to persist the theme to `localStorage`.
</PropField>
