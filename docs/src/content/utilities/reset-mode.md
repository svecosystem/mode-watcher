---
title: resetMode
description: Resets the mode to follow the system preference.
section: Utilities
---

`resetMode` is a utility function that clears the user's override and sets the mode back to `"system"`, allowing it to follow the operating system's color scheme.

This is equivalent to calling `setMode("system")`.

## Usage

```svelte
<script lang="ts">
	import { resetMode } from "mode-watcher";
</script>

<button onclick={resetMode}>System</button>
```
