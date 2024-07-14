---
title: themeLocalStorageKey
description: The key used to store the theme in local storage.
tagline: API Reference
---

<script>
	import { Callout } from '$lib/components'
</script>

The key used to store the _theme_ in local storage.

## Usage

If you wanted to clear the history of the user's theme preference, you could use the `themeLocalStorageKey` like so:

```svelte
<script lang="ts">
	import { themeLocalStorageKey } from "mode-watcher";

	function clearThemeFromLocalStorage() {
		localStorage.removeItem(themeLocalStorageKey);
	}
</script>

<p>Clear the user's mode preference history.</p>
<button on:click={clearModeFromLocalStorage}>Clear</button>
```
