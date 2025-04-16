---
title: mode
description: Tracks the current resolved mode (light or dark).
section: States
---

<script>
	import { Callout } from '@svecodocs/kit'
</script>

`mode` is a readable state representing the resolved mode: either `"light"` or `"dark"`. If accessed on the server, its value is `undefined`.

This value updates automatically based on user preferences and system settings.

<Callout variant="info">

This is the **resolved** mode - not the user’s selected preference. If the user chose `"system"`, this reflects the actual system setting (e.g., `"dark"`), not the string `"system"`. <br/> To get the user’s selection (`"light"`, `"dark"`, or `"system"`), use [`userPrefersMode`](/docs/states/user-prefers-mode).

</Callout>

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

<button onclick={handleModeChange}>{mode.current}</button>
```
