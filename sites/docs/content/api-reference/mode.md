---
title: mode
description: A store for tracking the current mode.
tagline: API Reference
---

A readable store that contains the current mode. It can be `"light"` or `"dark"`, or if evaluated on
the server, `undefined`.

## Usage

```svelte
<script lang="ts">
	import { setMode, mode } from "mode-watcher";

	function handleModeChange() {
		if ($mode === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	}
</script>

<button on:click={handleModeChange}>{$mode}</button>
```
