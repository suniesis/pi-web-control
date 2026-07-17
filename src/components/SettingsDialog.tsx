import { Check, MagnifyingGlass, Moon, Sun, X } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Appearance, ThemeId } from "../lib/appearance";
import { COLOR_THEMES } from "../lib/themes";

interface SettingsDialogProps {
  appearance: Appearance;
  themeId: ThemeId;
  onAppearanceChange: (appearance: Appearance) => void;
  onThemeChange: (themeId: ThemeId) => void;
  onClose: () => void;
}

const appearanceOptions: Array<{
  value: Appearance;
  label: string;
  icon: typeof Sun;
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

export function SettingsDialog({
  appearance,
  themeId,
  onAppearanceChange,
  onThemeChange,
  onClose,
}: SettingsDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const [themeQuery, setThemeQuery] = useState("");
  const filteredThemes = useMemo(() => {
    const query = themeQuery.trim().toLocaleLowerCase();
    return query
      ? COLOR_THEMES.filter((theme) => theme.name.toLocaleLowerCase().includes(query))
      : COLOR_THEMES;
  }, [themeQuery]);

  useEffect(() => {
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop settings-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="dialog settings-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="dialog-heading settings-heading">
          <div>
            <h2 id="settings-title">Settings</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </div>

        <div className="settings-section theme-section">
          <div className="settings-section-label">Theme</div>
          <label className="theme-search">
            <MagnifyingGlass size={14} aria-hidden="true" />
            <span className="sr-only">Search themes</span>
            <input
              type="search"
              value={themeQuery}
              placeholder="Search themes"
              onChange={(event) => setThemeQuery(event.target.value)}
            />
          </label>
          <div className="theme-options" role="listbox" aria-label="Theme">
            {filteredThemes.map((theme) => {
              const palette = theme[appearance];
              const active = theme.id === themeId;
              return (
                <button
                  className={`theme-option ${active ? "active" : ""}`}
                  key={theme.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => onThemeChange(theme.id)}
                >
                  <span className="theme-swatches" aria-hidden="true">
                    <span style={{ background: palette.neutral }} />
                    <span style={{ background: palette.primary }} />
                    <span style={{ background: palette.accent }} />
                  </span>
                  <span>{theme.name}</span>
                  {active ? <Check size={14} weight="bold" aria-hidden="true" /> : null}
                </button>
              );
            })}
            {filteredThemes.length === 0 ? <div className="theme-empty">No themes found</div> : null}
          </div>
        </div>

        <div className="settings-section appearance-section">
          <div className="settings-section-label">Appearance</div>
          <div className="appearance-options" role="group" aria-label="Appearance">
            {appearanceOptions.map((option) => {
              const Icon = option.icon;
              const active = appearance === option.value;
              return (
                <button
                  className={`appearance-option ${active ? "active" : ""}`}
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onAppearanceChange(option.value)}
                >
                  <span className="appearance-option-icon"><Icon size={18} /></span>
                  <span className="appearance-option-copy">
                    <strong>{option.label}</strong>
                  </span>
                  <span className="appearance-option-check" aria-hidden="true">
                    {active ? <Check size={14} weight="bold" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
