---
title: userPrefersMode
description: A state for tracking the user's preferred mode.
section: API Reference
---

A writeable store that represents the user's mode preference. It can be `"light"`, `"dark"` or `"system"`.

## Usage

```svelte
<script lang="ts">
	import { userPrefersMode } from "mode-watcher";
</script>

<p>Your preferred mode is: {userPrefersMode.current}</p>
```
