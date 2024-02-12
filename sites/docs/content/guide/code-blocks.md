---
title: Code Blocks
description: Learn how to use and customize code blocks.
tagline: Guide
---

<script>
	import { Callout } from '$lib/components'
</script>

Having a good code block experience is important for any documentation site. This template uses [shikiji](https://shikiji.netlify.app/guide/) and [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) to style and highlight code blocks.

## Basic usage

To use a code block, simply wrap your code in a fenced code block and specify the language:

````md
```ts
const name: string = "world";
console.log(`Hello, ${name}!`);
```
````

The markdown above will render the following:

```ts
const name: string = "world";
console.log(`Hello, ${name}!`);
```

## Meta Strings

Code blocks are customized using meta strings. Meta strings are strings that are added to the end of the language name in the fenced code block. For example, the following code block has a meta string of `title="example.ts"`:

````md
```ts title="example.ts"
console.log("hello");
```
````

You can use multiple meta strings in a single code block, and they can be in any order, separated by spaces.

<Callout type="tip" title="Pretty code">

The following sections will cover some of the meta strings that this template has been setup to use, but you can find a full list of meta strings in the [rehype-pretty-code documentation](https://rehype-pretty-code.netlify.app/#meta-strings).

</Callout>

### Titles

You can add a title to your code block by adding a title to the fenced code block:

````md
```ts title="example.ts"
const name: string = "world";
console.log(`Hello, ${name}!`);
```
````

The markdown above will render the following:

```ts title="example.ts"
const name: string = "world";
console.log(`Hello, ${name}!`);
```

### Line numbers

To display line numbers, add the `showLineNumbers` option to the fenced code block:

````md
```ts showLineNumbers
const name: string = "world";
console.log(`Hello, ${name}!`);
```
````

The markdown above will render the following:

```ts showLineNumbers
const name: string = "world";
console.log(`Hello, ${name}!`);
```

### Highlight lines

To highlight specific lines, include brackets containing a comma-separated list of line numbers:

````md
```ts {1,3}
const name: string = "world";

function sayHello(name: string): void {
	console.log(`Hello, ${name}!`);
}

sayHello(name);
```
````

The markdown above will render the following:

```ts {1,3}
const name: string = "world";

function sayHello(name: string): void {
	console.log(`Hello, ${name}!`);
}

sayHello(name);
```

### Highlight ranges

You can also specify a range of lines to highlight within the brackets:

````md
```ts {1,3-5,7}
const name: string = "world";

function sayHello(name: string): void {
	console.log(`Hello, ${name}!`);
}

sayHello(name);
```
````

The markdown above will render the following:

```ts {1,3-5,7}
const name: string = "world";

function sayHello(name: string): void {
	console.log(`Hello, ${name}!`);
}

sayHello(name);
```

### Group highlighted lines

You can group highlighted lines by ID by adding a `#` followed by an ID immediately following the brackets:

````md
```ts {1,4}#remove {3,5-6}#add
console.log("Hello, world!");

function getNameByUserId(userId: string): string {
	console.log(`Getting name for user ${userId}...`);
	return "some name";
}
```
````

The markdown above will render the following:

```ts {1,4}#remove {3,5-6}#add
console.log("Hello, world!");

function getNameByUserId(userId: string): string {
	console.log(`Getting name for user ${userId}...`);
	return "some name";
}
```

Currently, we only have out of the box styling for the `remove` and `add` IDs, but you can add your own custom ones by updating the styling in the `markdown.postcss` file.

## Language support

The following languages are supported and highlighted out of the box:

- Plaintext
- Shellscript
- TypeScript
- CSS
- Svelte
- Markdown

We don't include JavaScript, as TypeScript can adequately handle it.

If you'd like to add support for additional languages, you can do so by adding the language to the `prettyCodeOptions` object in the `mdsvex.config.js` file:

```ts title="mdsvex.config.js"
const prettyCodeOptions = {
	// ...
	getHighlighter: (options) =>
		getHighlighter({
			...options,
			langs: [
				"plaintext",
				import("shikiji/langs/typescript.mjs"),
				import("shikiji/langs/css.mjs"),
				import("shikiji/langs/svelte.mjs"),
				import("shikiji/langs/shellscript.mjs"),
				import("shikiji/langs/markdown.mjs"),
			],
		}),
	// ...
};
```

<Callout type="warning" title="Bundle Overload">
It's important to only include the languages you need, as importing all of the languages will increase the bundle size of your site, thus increasing the load time.
</Callout>
