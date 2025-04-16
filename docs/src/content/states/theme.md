---
title: theme
description: Tracks the current theme.
section: States
---

`theme` is a readable state that holds the currently active theme - a custom string defined by you.

Unlike [mode](/docs/states/mode), which resolves to `"light"` or `"dark"`, `theme` can be any string (e.g. `"dracula"`, `"retro"`, `"corporate"`) and is often used to support more granular visual styles.

Use it alongside `mode` to build a custom theme switcher, similar to [DaisyUI](https://daisyui.com)'s approach.

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
