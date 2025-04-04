---
title: Callout
description: A callout component to highlight important information.
section: Components
---

<script>
	import { Callout } from "@svecodocs/kit";
	import Avocado from "phosphor-svelte/lib/Avocado";
</script>

Callouts (also known as _admonitions_) are used to highlight a block of text. There are five types of callouts available: `'note'`, `'warning'`, `'danger'`, `'tip'`, and `'success'`.

You can override the default icon for the callout by passing a component via the `icon` prop.

## Usage

```svelte title="document.md"
<script>
	import { Callout } from "$lib/components";
</script>

<Callout type="note" title="Note">
	<!-- Space here-->
	This is a note, used to highlight important information or provide additional context. You can use
	markdown in here as well! Just ensure you include a space between the component and the content in
	your Markdown file.
	<!-- Space here-->
</Callout>
```

## Examples

### Warning

<Callout type="warning">

This is an example of a warning callout.

</Callout>

### Note

<Callout type="note">

This is an example of a note callout.

</Callout>

### Danger

<Callout type="danger">

This is an example of a danger callout.

</Callout>

### Tip

<Callout type="tip">

This is an example of a tip callout.

</Callout>

### Success

<Callout type="success">

This is an example of a success callout.

</Callout>

### Custom Icon

<Callout type="note" icon={Avocado}>

This is an example of a note callout with a custom icon.

</Callout>

### Custom Title

<Callout type="warning" title="Tread carefully">

This is an example of a warning callout with a custom title.

</Callout>
