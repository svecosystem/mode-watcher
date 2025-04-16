---
title: setMode
description: Sets the current mode to "light", "dark", or "system".
section: Utilities
---

`setMode` is a function that updates the user's preferred mode.

It accepts one of three string values: `"light"`, `"dark"`, or `"system"`.

This updates both the visual mode and the persisted preference in `localStorage`.

## Usage

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button onclick={() => setMode("light")}>Set Light Mode</button>
<button onclick={() => setMode("dark")}>Set Dark Mode</button>
```
