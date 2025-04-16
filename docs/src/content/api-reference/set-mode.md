---
title: setMode
description: Programatically set the mode.
section: API Reference
---

A function that sets the current mode. It accepts a string with the value `"light"`, `"dark"` or `"system"`.

## Usage

```svelte
<script lang="ts">
	import { setMode } from "mode-watcher";
</script>

<button onclick={() => setMode("light")}>Set Light Mode</button>
<button onclick={() => setMode("dark")}>Set Dark Mode</button>
```
