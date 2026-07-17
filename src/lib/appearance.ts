import { COLOR_THEMES, colorTheme } from "./themes";

export type Appearance = "light" | "dark";
export type ThemeId = string;

const APPEARANCE_STORAGE_KEY = "pi-web-appearance";
const THEME_STORAGE_KEY = "pi-web-theme";
const THEME_PROPERTIES = [
  "--bg",
  "--panel",
  "--raised",
  "--soft",
  "--soft-hover",
  "--text",
  "--muted",
  "--faint",
  "--line",
  "--line-strong",
  "--accent",
  "--accent-strong",
  "--accent-soft",
  "--accent-ink",
  "--danger",
  "--danger-soft",
  "--warning",
  "--warning-soft",
  "--shadow-surface",
  "--shadow-surface-hover",
] as const;

export function getInitialAppearance(): Appearance {
  try {
    const storedAppearance = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
    if (storedAppearance === "light" || storedAppearance === "dark") return storedAppearance;
  } catch {
    // Fall back to the operating-system preference when storage is unavailable.
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getInitialTheme(): ThemeId {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme && COLOR_THEMES.some((theme) => theme.id === storedTheme)) return storedTheme;
  } catch {
    // Fall back to the Pi palette when storage is unavailable.
  }

  return "pi";
}

function contrastInk(hex: string): string {
  const raw = hex.replace("#", "");
  const expanded = raw.length === 3 ? raw.split("").map((value) => value + value).join("") : raw.slice(0, 6);
  const channels = [0, 2, 4].map((offset) => Number.parseInt(expanded.slice(offset, offset + 2), 16) / 255);
  const [red, green, blue] = channels.map((channel) => channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  return luminance > 0.179 ? "#111111" : "#ffffff";
}

export function applyTheme(themeId: ThemeId, appearance: Appearance): void {
  const root = document.documentElement;
  const theme = colorTheme(themeId);
  root.dataset.theme = appearance;
  root.dataset.colorTheme = theme.id;
  root.style.colorScheme = appearance;

  for (const property of THEME_PROPERTIES) root.style.removeProperty(property);
  if (theme.id === "pi") return;

  const palette = theme[appearance];
  const light = appearance === "light";
  const variables: Record<(typeof THEME_PROPERTIES)[number], string> = {
    "--bg": light ? `color-mix(in srgb, ${palette.neutral} 96%, ${palette.ink})` : palette.neutral,
    "--panel": `color-mix(in srgb, ${palette.neutral} 97%, ${palette.ink})`,
    "--raised": light ? palette.neutral : `color-mix(in srgb, ${palette.neutral} 92%, ${palette.ink})`,
    "--soft": `color-mix(in srgb, ${palette.neutral} ${light ? 92 : 88}%, ${palette.ink})`,
    "--soft-hover": `color-mix(in srgb, ${palette.neutral} ${light ? 87 : 82}%, ${palette.ink})`,
    "--text": palette.ink,
    "--muted": palette.weak,
    "--faint": `color-mix(in srgb, ${palette.ink} 46%, ${palette.neutral})`,
    "--line": `color-mix(in srgb, ${palette.ink} 10%, transparent)`,
    "--line-strong": `color-mix(in srgb, ${palette.ink} 17%, transparent)`,
    "--accent": palette.primary,
    "--accent-strong": `color-mix(in srgb, ${palette.primary} 82%, ${palette.ink})`,
    "--accent-soft": `color-mix(in srgb, ${palette.neutral} 84%, ${palette.primary})`,
    "--accent-ink": contrastInk(palette.primary),
    "--danger": palette.error,
    "--danger-soft": `color-mix(in srgb, ${palette.neutral} 84%, ${palette.error})`,
    "--warning": palette.warning,
    "--warning-soft": `color-mix(in srgb, ${palette.neutral} 84%, ${palette.warning})`,
    "--shadow-surface": `0 0 0 1px color-mix(in srgb, ${palette.ink} 8%, transparent)`,
    "--shadow-surface-hover": `0 0 0 1px color-mix(in srgb, ${palette.ink} 14%, transparent)`,
  };

  for (const [property, value] of Object.entries(variables)) root.style.setProperty(property, value);
}

export function saveAppearance(appearance: Appearance): void {
  try {
    window.localStorage.setItem(APPEARANCE_STORAGE_KEY, appearance);
  } catch {
    // The selected appearance still applies for this page when storage is unavailable.
  }
}

export function saveTheme(themeId: ThemeId): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    // The selected theme still applies for this page when storage is unavailable.
  }
}
