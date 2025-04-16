---
title: toggleMode
description: Toggles between "light" and "dark" modes.
section: Utilities
---

`toggleMode` is a utility function that switches the current mode between `"light"` and `"dark"`.

If the mode is currently set to `"system"`, it will first resolve to the system preference, then toggle from there.

## Usage

```svelte
<script lang="ts">
	import { toggleMode } from "mode-watcher";
</script>

<button onclick={toggleMode}>Toggle Mode</button>
```
