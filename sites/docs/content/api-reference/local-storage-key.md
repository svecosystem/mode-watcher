---
title: localStorageKey
description: The key used to store the mode in local storage.
tagline: API Reference
---

<script>
	import { Callout } from '$lib/components'
</script>

The key used to store the mode in local storage.

## Usage

If you wanted to clear the history of the user's mode preference, you could use the `localStorageKey` like so:

```svelte
<script lang="ts">
	import { localStorageKey } from "mode-watcher";

	function clearModeFromLocalStorage() {
		localStorage.removeItem(localStorageKey);
	}
</script>

<p>Clear the user's mode preference history.</p>
<button on:click={clearModeFromLocalStorage}>Clear</button>
```
