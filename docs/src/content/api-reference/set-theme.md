---
title: setTheme
description: Programatically set the custom theme.
section: API Reference
---

A function that sets the current custom theme, not to be confused with [`setMode`](/docs/api-reference/set-mode), which sets the mode (`'light'`, `'dark'` or `'system'`).

The theme can be set to any arbitrary string value, and is persisted to localStorage and applied to the root `html` element via the `data-theme` attribute.

## Usage

```svelte
<script lang="ts">
	import { setTheme } from "mode-watcher";
</script>

<button onclick={() => setTheme("dracula")}>Dracula Theme</button>
<button onclick={() => setTheme("retro")}>Retro Theme</button>
```
