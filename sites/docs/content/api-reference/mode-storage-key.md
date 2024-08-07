---
title: modeStorageKey
description: The key used to store the mode in local storage.
tagline: API Reference
---

The key used to store the `mode` in local storage.

## Usage

If you wanted to clear the history of the user's mode preference, you could use the `modeStorageKey` like so:

```svelte
<script lang="ts">
	import { modeStorageKey } from "mode-watcher";

	function clearModeFromLocalStorage() {
		localStorage.removeItem($modeStorageKey);
	}
</script>

<p>Clear the user's mode preference history.</p>
<button on:click={clearModeFromLocalStorage}>Clear</button>
```
