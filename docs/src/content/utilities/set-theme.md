---
title: setTheme
description: Sets the current custom theme
section: Utilities
---

`setTheme` is a function that updates the active custom theme.

Unlike [setMode](/docs/utilities/set-mode), which toggles light/dark/system modes, `setTheme` accepts any string (e.g. `"dracula"`, `"retro"`, `"corporate"`), persists it to `localStorage`, and applies it to the `<html>` element via the `data-theme` attribute.

This enables support for more granular visual themes, similar to [DaisyUI](https://daisyui.com).

## Usage

```svelte
<script lang="ts">
	import { setTheme } from "mode-watcher";
</script>

<button onclick={() => setTheme("dracula")}>Dracula Theme</button>
<button onclick={() => setTheme("retro")}>Retro Theme</button>
```
