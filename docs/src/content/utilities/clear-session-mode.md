---
title: clearTemporaryMode
description: Clears the temporary override and reverts to the persisted or system mode.
section: Utilities
---

`clearTemporaryMode` removes any temporary mode set via `setMode(..., { temporaryOnly: true })`.

After calling this, the active mode falls back to the user's persisted preference (from `localStorage`) or to the system preference if none is set.

## Usage

```svelte
<script lang="ts">
	import { clearTemporaryMode } from "mode-watcher";
</script>

<button onclick={clearTemporaryMode}>Use persisted/system preference</button>
```

## See also

- [setMode](/docs/utilities/set-mode)
- [resetMode](/docs/utilities/reset-mode)
