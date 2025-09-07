---
title: clearSessionMode
description: Clears the session-only override and reverts to the persisted or system mode.
section: Utilities
---

`clearSessionMode` removes any temporary, session-only mode set via `setMode(..., { sessionOnly: true })`.

After calling this, the active mode falls back to the user's persisted preference (from `localStorage`) or to the system preference if none is set.

## Usage

```svelte
<script lang="ts">
	import { clearSessionMode } from "mode-watcher";
</script>

<button onclick={clearSessionMode}>Use persisted/system preference</button>
```

## See also

- [setMode](/docs/utilities/set-mode)
- [resetMode](/docs/utilities/reset-mode)
