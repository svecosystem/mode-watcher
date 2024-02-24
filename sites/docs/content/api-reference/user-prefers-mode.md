---
title: userPrefersMode
description: A store for tracking the user's preferred mode.
tagline: API Reference
---

A writeable store that represents the user's mode preference. It can be "light", "dark" or "system".

## Usage

```svelte
<script lang="ts">
	import { userPrefersMode } from "mode-watcher";
</script>

<p>Your preferred mode is: {$userPrefersMode}</p>
```
