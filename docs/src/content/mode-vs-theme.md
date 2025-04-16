---
title: Mode vs Theme
description: A comparison between mode and theme.
section: Overview
---

In Mode Watcher, _mode_ and _theme_ are distinct concepts. They work together, but they're not the same, and knowing the difference is key to using Mode Watcher effectively.

## Mode

The mode represents the user's preference for a light or dark interface. It can be one of the following:

- `"light"`
- `"dark"`
- `"system"` (follows the operating system’s preference)

Mode Watcher uses this value to:

- Apply the correct `class` (`light` or `dark`) to the root `<html>` element
- Set the corresponding `color-scheme` (`light` or `dark`) for browser rendering

This ensures consistent styling based on user or system preferences.

## Theme

A theme is a design system that defines the visual identity of your application - colors, typography, spacing, layout, etc.

Themes can include both light and dark variants. For example:

- A `dracula` theme might contain both `dracula-light` and `dracula-dark` styles.
- Mode Watcher automatically chooses the correct variant based on the current mode.

You don't need to create separate themes like `dracula-light` and `dracula-dark`. Instead, provide a single `dracula` theme with both variants, and let Mode Watcher handle the switching.

## Summary

- **Mode** = user's light/dark preference
- **Theme** = overall design system (can adapt to mode)

They're different layers of customization—mode controls which variant of the theme is shown.
