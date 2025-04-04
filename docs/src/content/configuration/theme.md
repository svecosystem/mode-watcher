---
title: Theme
description: Learn how to customize the theme in your Svecodocs project.
section: Configuration
---

The theme determines the branded color scheme for your site. A theme for each of the TailwindCSS colors is provided by the `@svecodocs/kit` package. Each theme has been designed to present well in both light and dark mode.

## Using a theme

To use a theme, import the theme file into your `src/app.css` file _before_ importing the `@svecodocs/kit/globals.css` file.

```css
/* @import "@svecodocs/kit/theme-orange.css"; */
@import "@svecodocs/kit/theme-emerald.css";
@import "@svecodocs/kit/globals.css";
```

It's not recommended to customize the theme to maintain consistency across the UI components that are provided by Svecodocs and align with the provided themes.

## Available themes

| Theme name | Import path                        |
| ---------- | ---------------------------------- |
| orange     | `@svecodocs/kit/theme-orange.css`  |
| green      | `@svecodocs/kit/theme-green.css`   |
| blue       | `@svecodocs/kit/theme-blue.css`    |
| purple     | `@svecodocs/kit/theme-purple.css`  |
| pink       | `@svecodocs/kit/theme-pink.css`    |
| lime       | `@svecodocs/kit/theme-lime.css`    |
| yellow     | `@svecodocs/kit/theme-yellow.css`  |
| cyan       | `@svecodocs/kit/theme-cyan.css`    |
| teal       | `@svecodocs/kit/theme-teal.css`    |
| violet     | `@svecodocs/kit/theme-violet.css`  |
| amber      | `@svecodocs/kit/theme-amber.css`   |
| red        | `@svecodocs/kit/theme-red.css`     |
| sky        | `@svecodocs/kit/theme-sky.css`     |
| emerald    | `@svecodocs/kit/theme-emerald.css` |
| fuchsia    | `@svecodocs/kit/theme-fuchsia.css` |
| rose       | `@svecodocs/kit/theme-rose.css`    |

## Tailwind Variables

Svecodocs uses TailwindCSS to style the UI components and provides a set of Tailwind variables that can be used to style your examples/custom components.

### Gray

We override the TailwindCSS `gray` color scale to provide our own grays.

### Brand

You can use the `brand` color to use the brand color of your project.
