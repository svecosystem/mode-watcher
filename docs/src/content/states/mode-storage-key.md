---
title: modeStorageKey
description: The local storage key used to persist the user's selected mode.
section: States
---

`modeStorageKey` is a readable state containing the string key used to persist the user's selected mode (`"light"`, `"dark"`, or `"system"`) in `localStorage`.

This is useful if you need to manually read, write, or clear the stored value.

## Usage

If you wanted to clear the history of the user's mode preference, you could use the `modeStorageKey` like so:

```svelte
<script lang="ts">
	import { modeStorageKey } from "mode-watcher";

	function clearModeFromLocalStorage() {
		localStorage.removeItem(modeStorageKey.current);
	}
</script>

<p>Clear the user's mode preference history.</p>
<button onclick={clearModeFromLocalStorage}>Clear</button>
```
