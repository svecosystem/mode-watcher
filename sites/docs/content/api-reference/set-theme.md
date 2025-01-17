---
title: setTheme
description: Programatically set the custom theme.
tagline: API Reference
---

A function that sets the current custom theme, not to be confused with
[`setMode`](/docs/api-reference/set-mode), which sets the mode (`'light'`, `'dark'` or `'system'`).

The theme can be set to any arbitrary string value, and is persisted to localStorage and applied to
the root `html` element via the `data-theme` attribute.

## Usage

```svelte
<script lang="ts">
	import { setTheme } from "mode-watcher";
</script>

<button on:click={() => setTheme("dracula")}>Dracula Theme</button>
<button on:click={() => setTheme("retro")}>Retro Theme</button>
```
