// Palette data adapted from anomalyco/opencode at commit 3238daa851409746e15c00824eaa95550544061c.
// OpenCode is MIT-licensed; see THIRD_PARTY_NOTICES.md.

export interface ThemePalette {
  neutral: string;
  ink: string;
  primary: string;
  accent: string;
  warning: string;
  error: string;
  weak: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  source: "pi" | "opencode";
  light: ThemePalette;
  dark: ThemePalette;
}

type RawPalette = readonly [string, string, string, string, string, string, string];
type RawTheme = readonly [string, string, RawPalette, RawPalette];

const OPENCODE_THEME_DATA: readonly RawTheme[] = [
  ["amoled", "AMOLED", ["#f0f0f0", "#0a0a0a", "#6200ff", "#ff0080", "#ffab00", "#ff1744", "#757575"], ["#000000", "#ffffff", "#b388ff", "#ff4081", "#ffea00", "#ff1744", "#555555"]],
  ["aura", "Aura", ["#f5f0ff", "#2d2640", "#a277ff", "#d94f4f", "#d9a24a", "#d94f4f", "#8d88a3"], ["#15141b", "#edecee", "#a277ff", "#ff6767", "#ffca85", "#ff6767", "#6d6a7e"]],
  ["ayu", "Ayu", ["#fdfaf4", "#4f5964", "#4aa8c8", "#ef7d71", "#ea9f41", "#e6656a", "#6e7681"], ["#0f1419", "#d6dae0", "#3fb7e3", "#f2856f", "#e4a75c", "#f58572", "#5a6673"]],
  ["carbonfox", "Carbonfox", ["#8e8e8e", "#161616", "#0072c3", "#da1e28", "#f1c21b", "#da1e28", "#6f6f6f"], ["#393939", "#f2f4f8", "#33b1ff", "#ff8389", "#f1c21b", "#ff8389", "#6f6f6f"]],
  ["catppuccin-frappe", "Catppuccin Frappe", ["#303446", "#c6d0f5", "#8da4e2", "#f4b8e4", "#e5c890", "#e78284", "#b5bfe2"], ["#303446", "#c6d0f5", "#8da4e2", "#f4b8e4", "#e5c890", "#e78284", "#b5bfe2"]],
  ["catppuccin-macchiato", "Catppuccin Macchiato", ["#24273a", "#cad3f5", "#8aadf4", "#f5bde6", "#eed49f", "#ed8796", "#b8c0e0"], ["#24273a", "#cad3f5", "#8aadf4", "#f5bde6", "#eed49f", "#ed8796", "#b8c0e0"]],
  ["catppuccin", "Catppuccin", ["#f5e0dc", "#4c4f69", "#7287fd", "#d20f39", "#df8e1d", "#d20f39", "#6c7086"], ["#1e1e2e", "#cdd6f4", "#b4befe", "#f38ba8", "#f4b8e4", "#f38ba8", "#6c7086"]],
  ["cobalt2", "Cobalt2", ["#ffffff", "#193549", "#0066cc", "#00acc1", "#ff9800", "#e91e63", "#5c6b7d"], ["#193549", "#ffffff", "#0088ff", "#2affdf", "#ffc600", "#ff0088", "#adb7c9"]],
  ["cursor", "Cursor", ["#fcfcfc", "#141414", "#6f9ba6", "#6f9ba6", "#db704b", "#cf2d56", "#141414ad"], ["#181818", "#e4e4e4", "#88c0d0", "#88c0d0", "#f1b467", "#e34671", "#e4e4e45e"]],
  ["dracula", "Dracula", ["#f8f8f2", "#1f1f2f", "#7c6bf5", "#d16090", "#f7a14d", "#d9536f", "#7d7f97"], ["#1d1e28", "#f8f8f2", "#bd93f9", "#ff79c6", "#ffb86c", "#ff5555", "#6272a4"]],
  ["everforest", "Everforest", ["#fdf6e3", "#5c6a72", "#8da101", "#df69ba", "#f57d26", "#f85552", "#a6b0a0"], ["#2d353b", "#d3c6aa", "#a7c080", "#d699b6", "#e69875", "#e67e80", "#7a8478"]],
  ["flexoki", "Flexoki", ["#FFFCF0", "#100F0F", "#205EA6", "#BC5215", "#BC5215", "#AF3029", "#6F6E69"], ["#100F0F", "#CECDC3", "#DA702C", "#8B7EC8", "#DA702C", "#D14D41", "#6F6E69"]],
  ["github", "GitHub", ["#ffffff", "#24292f", "#0969da", "#1b7c83", "#9a6700", "#cf222e", "#57606a"], ["#0d1117", "#c9d1d9", "#58a6ff", "#39c5cf", "#e3b341", "#f85149", "#8b949e"]],
  ["gruvbox", "Gruvbox", ["#fbf1c7", "#3c3836", "#076678", "#9d0006", "#b57614", "#9d0006", "#928374"], ["#282828", "#ebdbb2", "#83a598", "#fb4934", "#fabd2f", "#fb4934", "#928374"]],
  ["kanagawa", "Kanagawa", ["#F2E9DE", "#54433A", "#2D4F67", "#D27E99", "#D7A657", "#E82424", "#9E9389"], ["#1F1F28", "#DCD7BA", "#7E9CD8", "#D27E99", "#D7A657", "#E82424", "#727169"]],
  ["lucent-orng", "Lucent Orng", ["#fff5f0", "#1a1a1a", "#EC5B2B", "#c94d24", "#EC5B2B", "#d1383d", "#8a8a8a"], ["#2a1a15", "#eeeeee", "#EC5B2B", "#FFF7F1", "#EC5B2B", "#e06c75", "#808080"]],
  ["material", "Material", ["#fafafa", "#263238", "#6182b8", "#39adb5", "#ffb300", "#e53935", "#90a4ae"], ["#263238", "#eeffff", "#82aaff", "#89ddff", "#ffcb6b", "#f07178", "#546e7a"]],
  ["matrix", "Matrix", ["#eef3ea", "#203022", "#1cc24b", "#c770ff", "#e6ff57", "#ff4b4b", "#748476"], ["#0a0e0a", "#62ff94", "#2eff6a", "#c770ff", "#e6ff57", "#ff4b4b", "#8ca391"]],
  ["mercury", "Mercury", ["#ffffff", "#363644", "#5266eb", "#8da4f5", "#a44200", "#b0175f", "#70707d"], ["#171721", "#dddde5", "#8da4f5", "#8da4f5", "#fc9b6f", "#fc92b4", "#9d9da8"]],
  ["monokai", "Monokai", ["#fdf8ec", "#292318", "#bf7bff", "#d9487c", "#f1a948", "#e54b4b", "#8a816f"], ["#272822", "#f8f8f2", "#ae81ff", "#f92672", "#fd971f", "#f92672", "#75715e"]],
  ["nightowl", "Night Owl", ["#f0f0f0", "#403f53", "#4876d6", "#aa0982", "#c96765", "#de3d3b", "#7a8181"], ["#011627", "#d6deeb", "#82aaff", "#f78c6c", "#ecc48d", "#ef5350", "#637777"]],
  ["nord", "Nord", ["#eceff4", "#2e3440", "#5e81ac", "#bf616a", "#d08770", "#bf616a", "#6b7282"], ["#2e3440", "#e5e9f0", "#88c0d0", "#d57780", "#d08770", "#bf616a", "#616e88"]],
  ["oc-2", "OC-2", ["#f7f7f7", "#171311", "#dcde8d", "#dcde8d", "#ffdc17", "#fc533a", "#8F8F8F"], ["#1f1f1f", "#f1ece8", "#fab283", "#fab283", "#fcd53a", "#fc533a", "#707070"]],
  ["one-dark", "One Dark", ["#fafafa", "#383a42", "#4078f2", "#0184bc", "#c18401", "#e45649", "#a0a1a7"], ["#282c34", "#abb2bf", "#61afef", "#56b6c2", "#e5c07b", "#e06c75", "#5c6370"]],
  ["onedarkpro", "One Dark Pro", ["#f5f6f8", "#2b303b", "#528bff", "#d85462", "#d19a66", "#e06c75", "#6a717d"], ["#1e222a", "#abb2bf", "#61afef", "#e06c75", "#e5c07b", "#e06c75", "#5c6370"]],
  ["opencode", "OpenCode", ["#ffffff", "#1a1a1a", "#3b7dd8", "#d68c27", "#d68c27", "#d1383d", "#8a8a8a"], ["#0a0a0a", "#eeeeee", "#fab283", "#9d7cd8", "#f5a742", "#e06c75", "#808080"]],
  ["orng", "Orng", ["#ffffff", "#1a1a1a", "#EC5B2B", "#c94d24", "#EC5B2B", "#d1383d", "#8a8a8a"], ["#0a0a0a", "#eeeeee", "#EC5B2B", "#FFF7F1", "#EC5B2B", "#e06c75", "#808080"]],
  ["osaka-jade", "Osaka Jade", ["#F6F5DD", "#111c18", "#1faa90", "#3d7a52", "#b5a020", "#c7392d", "#53685B"], ["#111c18", "#C1C497", "#2DD5B7", "#549e6a", "#E5C736", "#FF5345", "#53685B"]],
  ["palenight", "Palenight", ["#fafafa", "#292d3e", "#4976eb", "#00acc1", "#ffb300", "#e53935", "#8796b0"], ["#292d3e", "#a6accd", "#82aaff", "#89ddff", "#ffcb6b", "#f07178", "#676e95"]],
  ["rosepine", "Rose Pine", ["#faf4ed", "#575279", "#31748f", "#d7827e", "#ea9d34", "#b4637a", "#9893a5"], ["#191724", "#e0def4", "#9ccfd8", "#ebbcba", "#f6c177", "#eb6f92", "#6e6a86"]],
  ["shadesofpurple", "Shades of Purple", ["#f7ebff", "#3b2c59", "#7a5af8", "#ff6bd5", "#f7c948", "#ff6bd5", "#8e4be3"], ["#1a102b", "#f5f0ff", "#c792ff", "#ff7ac6", "#ffd580", "#ff7ac6", "#b362ff"]],
  ["solarized", "Solarized", ["#fdf6e3", "#586e75", "#268bd2", "#d33682", "#b58900", "#dc322f", "#657b83"], ["#002b36", "#93a1a1", "#6c71c4", "#d33682", "#b58900", "#dc322f", "#586e75"]],
  ["synthwave84", "Synthwave '84", ["#fafafa", "#262335", "#00bcd4", "#9c27b0", "#ff9800", "#f44336", "#5c5c8a"], ["#262335", "#ffffff", "#36f9f6", "#b084eb", "#fede5d", "#fe4450", "#848bbd"]],
  ["tokyonight", "Tokyonight", ["#e1e2e7", "#273153", "#2e7de9", "#b15c00", "#8c6c3e", "#c94060", "#6b6f7a"], ["#1a1b26", "#c0caf5", "#7aa2f7", "#ff9e64", "#e0af68", "#f7768e", "#565f89"]],
  ["vercel", "Vercel", ["#FFFFFF", "#171717", "#0070F3", "#8E4EC6", "#FF9500", "#DC3545", "#666666"], ["#000000", "#EDEDED", "#0070F3", "#8E4EC6", "#FFB224", "#E5484D", "#878787"]],
  ["vesper", "Vesper", ["#F0F0F0", "#101010", "#FFC799", "#B30000", "#FFC799", "#FF8080", "#7a7a7a"], ["#101010", "#FFF", "#FFC799", "#FF8080", "#FFC799", "#FF8080", "#8b8b8b"]],
  ["zenburn", "Zenburn", ["#ffffef", "#3f3f3f", "#5f7f8f", "#5f8f8f", "#8f8f5f", "#8f5f5f", "#6f6f6f"], ["#3f3f3f", "#dcdccc", "#8cd0d3", "#93e0e3", "#f0dfaf", "#cc9393", "#9f9f9f"]],
];

function palette([neutral, ink, primary, accent, warning, error, weak]: RawPalette): ThemePalette {
  return { neutral, ink, primary, accent, warning, error, weak };
}

const piTheme: ColorTheme = {
  id: "pi",
  name: "Pi",
  source: "pi",
  light: palette(["#f2f2ef", "#20201e", "#63743b", "#63743b", "#876624", "#a44438", "#6d6d67"]),
  dark: palette(["#111110", "#eeeeea", "#b4c875", "#b4c875", "#dbbb71", "#e08a7f", "#a3a39c"]),
};

export const COLOR_THEMES: readonly ColorTheme[] = [
  piTheme,
  ...OPENCODE_THEME_DATA.map(([id, name, light, dark]) => ({
    id,
    name,
    source: "opencode" as const,
    light: palette(light),
    dark: palette(dark),
  })),
];

export function colorTheme(themeId: string): ColorTheme {
  return COLOR_THEMES.find((theme) => theme.id === themeId) ?? piTheme;
}
