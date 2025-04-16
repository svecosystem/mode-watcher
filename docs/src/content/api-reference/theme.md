---
title: theme
description: A state for tracking the current theme.
section: API Reference
---

A readable state that contains the current theme, not to be confused with [`mode`](/docs/api-reference/mode), which contains the current mode (`'light'`, `'dark'` or `'system'`). The theme can be any arbitrary string value set by the developer, and can be used in conjunction with `mode` to create a custom theme switcher, similar to [Daisy UI](https://daisyui.com)'s.

## Usage

```svelte
<script lang="ts">
	import { setTheme, theme } from "mode-watcher";

	function cycleTheme() {
		if (theme.current === "dracula") {
			setTheme("retro");
		} else {
			setTheme("dracula");
		}
	}
</script>

<button onclick={cycleTheme}>{theme.current}</button>
```
