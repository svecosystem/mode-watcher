---
title: themeStorageKey
description: The local storage key used to persist the theme.
section: States
---

`themeStorageKey` is a readable state containing the string key used to persist the user's selected theme in `localStorage`.

This is helpful if you need to manually inspect, modify, or clear the stored theme value.

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
