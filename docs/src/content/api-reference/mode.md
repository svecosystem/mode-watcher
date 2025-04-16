---
title: mode
description: A state for tracking the current mode.
section: API Reference
---

A readable state that contains the current mode. It can be `"light"` or `"dark"`, or if evaluated on the server, `undefined`. For user selectable modes, use [`userPrefersMode`](/docs/api-reference/user-prefers-mode).

## Usage

```svelte
<script lang="ts">
	import { setMode, mode } from "mode-watcher";

	function handleModeChange() {
		if (mode.current === "light") {
			setMode("dark");
		} else {
			setMode("light");
		}
	}
</script>

<button onclick={handleModeChange}>{$mode}</button>
```
