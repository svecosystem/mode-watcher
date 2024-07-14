---
title: Introduction
description: What is this?
tagline: Guide
---

Mode Watcher provides simple utilities to manage light & dark mode in your SvelteKit app.

## Features

-   Dark mode for your Svelte app with two lines of code.
-   No flash of unstyled content, compitable with SSR, CSR and SSG.
-   Detect and track `prefers-color-scheme` changes in real-time.
-   Theme scrollbars and form controls through the `color-scheme` property.
-   Theme surrounding browser interface through the `theme-color` meta tag.
-   Allows users to toggle between light and dark mode or respect their system preference.
-   User preference persistence thanks `localStorage` - syncs theme across tabs and windows.
-   Allows for a default theme to be set.
-   Disables CSS transitions during theme changes to prevent flickering.
