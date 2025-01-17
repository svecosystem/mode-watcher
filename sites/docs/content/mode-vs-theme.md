---
title: Mode vs Theme
description: A comparison between mode and theme.
tagline: Guide
---

"Mode" and "Theme" are two different concepts in Mode Watcher. They are not interchangeable, and
understanding the difference between them is crucial for using Mode Watcher effectively.

## Mode

Mode is a term used to describe the current state of the user's preference for light or dark mode.
It can be either `"light"`, `"dark"`, or `"system"`.

Mode Watcher uses this to determine the appropriate CSS class and `color-scheme` to apply to the
root `html` element. For example, if the user's preference is set to `"dark"`, Mode Watcher will
apply the `dark` class to the root `html` element and set the `color-scheme` to `"dark"`.

## Theme

A theme is a collection of CSS styles that define the visual appearance of an application. It can
include things like colors, fonts, spacing, and layout. Themes are typically used to provide a
consistent look and feel across different applications or devices.

Oftentimes, a theme will have a light and dark version, with the light version being used when the
user's preference is set to `"light"` and the dark version being used when the user's preference is
set to `"dark"`.

You don't need to have a `dracula-dark` and `dracula-light` theme, you can just have a `dracula`
theme that has both a light and dark version, and Mode Watcher will automatically switch between
them based on the user's preference.
