import type { modes } from './stores';

export type Mode = typeof modes[number];
export type ThemeColors = { dark: string; light: string } | undefined;
