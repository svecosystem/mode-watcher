---
title: themeStorageKey
description: The key used to store the theme in local storage.
section: API Reference
---

The key used to store the `theme` in local storage.

## Usage

If you wanted to clear the history of the user's mode preference, you could use the `themeStorageKey` like so:

```svelte
<script lang="ts">
	import { themeStorageKey } from "mode-watcher";

	function clearThemeFromLocalStorage() {
		localStorage.removeItem(themeStorageKey.current);
	}
</script>

<p>Clear the user's theme preference history.</p>
<button onclick={clearThemeFromLocalStorage}>Clear</button>
```
