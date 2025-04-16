---
title: userPrefersMode
description: Tracks the user's selected mode preference ("light", "dark", or "system").
section: States
---

`userPrefersMode` is a writable state representing the user's explicit preference: `"light"`, `"dark"`, or `"system"`.

This differs from [mode](/docs/states/mode), which reflects the resolved mode based on system settings when `"system"` is selected.

Use `userPrefersMode` when you want to display or persist the user's selected preference, even if it defers to the system.

## Usage

```svelte
<script lang="ts">
	import { userPrefersMode } from "mode-watcher";
</script>

<p>Your preferred mode is: {userPrefersMode.current}</p>
```
