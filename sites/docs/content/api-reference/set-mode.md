---
title: setMode
description: Programatically set the mode.
tagline: API Reference
---

A function that sets the current mode. It accepts a string with the value `"light"`, `"dark"` or
`"system"`.

## Usage

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button on:click={() => setMode("light")}>Set Light Mode</button>
<button on:click={() => setMode("dark")}>Set Dark Mode</button>
```
