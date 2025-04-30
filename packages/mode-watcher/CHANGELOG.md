# mode-watcher

## 1.0.4

### Patch Changes

- change: mark `generateSetInitialModeExpression` as deprecated in favor of `createInitialModeExpression` ([#132](https://github.com/svecosystem/mode-watcher/pull/132))

## 1.0.3

### Patch Changes

- fix: ensure to always use custom storage keys if provided ([#130](https://github.com/svecosystem/mode-watcher/pull/130))

## 1.0.2

### Patch Changes

- fix: FOUC ([#122](https://github.com/svecosystem/mode-watcher/pull/122))

## 1.0.1

### Patch Changes

- fix: `window.matchMedia` is not defined ([#120](https://github.com/svecosystem/mode-watcher/pull/120))

## 1.0.0

### Major Changes

- Mode Watcher 1.0 (Svelte 5) ([#112](https://github.com/svecosystem/mode-watcher/pull/112))

## 0.5.1

### Patch Changes

- silence hydration mismatch warning ([#108](https://github.com/svecosystem/mode-watcher/pull/108))

## 0.5.0

### Minor Changes

- feat: add ability to disable head script injection via the `disableHeadScriptInjection` prop for handling in hooks.server files ([#89](https://github.com/svecosystem/mode-watcher/pull/89))

### Patch Changes

- fix: hydration issues ([#99](https://github.com/svecosystem/mode-watcher/pull/99))

## 0.4.1

### Patch Changes

- Fix bug where `data-theme` attribute wasn't syncing with the theme ([#87](https://github.com/svecosystem/mode-watcher/pull/87))

## 0.4.0

### Minor Changes

- feat: Custom ClassNames ([#80](https://github.com/svecosystem/mode-watcher/pull/80))

- feat: Add `nonce` prop ([#82](https://github.com/svecosystem/mode-watcher/pull/82))

- feat: Custom storage key names `modeStorageKey` `themeStorageKey` ([#84](https://github.com/svecosystem/mode-watcher/pull/84))

- feat: Add support for custom themes ([#83](https://github.com/svecosystem/mode-watcher/pull/83))

## 0.3.1

### Patch Changes

- chore: add svelte 5 to peer deps ([#77](https://github.com/svecosystem/mode-watcher/pull/77))

## 0.3.0

### Minor Changes

- feat: `disableTransitions` prop ([#68](https://github.com/svecosystem/mode-watcher/pull/68))

## 0.2.2

### Patch Changes

- Update `moduleResolution` to `NodeNext` ([#63](https://github.com/svecosystem/mode-watcher/pull/63))

## 0.2.1

### Patch Changes

- Fix incorrect localStorage key ([#51](https://github.com/svecosystem/mode-watcher/pull/51))

## 0.2.0

### Minor Changes

- Allow `mode-watcher` to manage the theme-color meta tag ([#48](https://github.com/svecosystem/mode-watcher/pull/48))

## 0.1.2

### Patch Changes

- f30aa9f: add defaultMode prop

## 0.1.1

### Patch Changes

- 8c71d5a: Fix bug where mode would not change unless the `mode` store was subscribed to

## 0.1.0

### Minor Changes

- ec7750d: Rewrite mode-watcher with custom stores

## 0.0.7

### Patch Changes

- abc9b03: Fix bug missing withoutTransition in head

## 0.0.6

### Patch Changes

- 289d4d6: Fix: prevent transitions during theme change

## 0.0.5

### Patch Changes

- 8c93706: Add `track` prop which allows `<ModeWatcher>` to track changes in system preference
- 9dbbb39: Fixed bug in `setMode` which prevented user preferences from being set
- 4cb519e: Fix: remove unnecessary dep

## 0.0.4

### Patch Changes

- 487c5e3: Change persistent stores to use `dark` | `light` strings instead of booleans

## 0.0.3

### Patch Changes

- 0d3ef7f: Add `resetMode` function to reset mode to OS preference

## 0.0.2

### Patch Changes

- a03b451: Add `color-scheme` style to document element

## 0.0.1

### Patch Changes

- 5a18026: Initial release
