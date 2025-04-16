---
title: systemPrefersMode
description: Tracks the operating system's preferred color scheme.
section: States
---

`systemPrefersMode` is a readable state representing the operating system's current color scheme preference.
It will be `"light"` or `"dark"` in the browser, or `undefined` when evaluated on the server.

This value updates automatically when the system's preference changes - unless tracking is disabled by setting `track={false}` in the [ModeWatcher](/docs/components/mode-watcher) component.

## Usage

```svelte
<script lang="ts">
	import { systemPrefersMode } from "mode-watcher";
</script>

<p>The system prefers mode is: {systemPrefersMode.current}</p>
```
