import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { App } from "./App";
import { applyTheme, getInitialAppearance, getInitialTheme } from "./lib/appearance";
import "./styles.css";

applyTheme(getInitialTheme(), getInitialAppearance());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
