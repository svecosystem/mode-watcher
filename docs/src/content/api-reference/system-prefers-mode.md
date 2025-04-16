---
title: systemPrefersMode
description: A state for tracking the system's preferred mode.
section: API Reference
---

A readable state that represents the operating system's mode preference. It can be `"light"` or `"dark"`, or if evaluated on the server, `undefined`.

This state will automatically track changes to the operating system's mode preference unless this is disabled by setting the `track` prop to `false` in the [ModeWatcher](/docs/api-reference/mode-watcher) component.

## Usage

```svelte
<script lang="ts">
	import { systemPrefersMode } from "mode-watcher";
</script>

<p>The system prefers mode is: {systemPrefersMode.current}</p>
```
