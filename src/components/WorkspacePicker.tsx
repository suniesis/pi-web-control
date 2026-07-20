import {
  ArrowRight,
  ArrowUp,
  Check,
  CircleNotch,
  FolderSimple,
  House,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { DirectoryListing } from "../types";

type WorkspacePickerProps = {
  listing: DirectoryListing | null;
  loading: boolean;
  error?: string;
  onNavigate: (path?: string) => void;
  onSelect: (path: string) => void;
  onClose: () => void;
};

function isPathQuery(value: string): boolean {
  return value.startsWith("/") || value.startsWith("~") || /^[A-Za-z]:[\\/]/.test(value);
}

export function WorkspacePicker({
  listing,
  loading,
  error,
  onNavigate,
  onSelect,
  onClose,
}: WorkspacePickerProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const filteredDirectories = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized || isPathQuery(normalized)) return listing?.directories ?? [];
    return (listing?.directories ?? []).filter((directory) =>
      directory.name.toLocaleLowerCase().includes(normalized) ||
      directory.path.toLocaleLowerCase().includes(normalized));
  }, [listing, query]);

  useEffect(() => {
    setQuery("");
    searchRef.current?.focus();
  }, [listing?.path]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const value = query.trim();
    if (value && isPathQuery(value)) {
      onNavigate(value);
      return;
    }
    const firstMatch = filteredDirectories[0];
    if (firstMatch) {
      onSelect(firstMatch.path);
      return;
    }
    if (!value && listing) onSelect(listing.path);
  }

  return (
    <div
      className="modal-backdrop workspace-picker-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="dialog workspace-picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="workspace-picker-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="workspace-picker-heading">
          <div>
            <h2 id="workspace-picker-title">Choose a workspace</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close workspace picker">
            <X size={18} />
          </button>
        </div>

        <form className="workspace-picker-search" onSubmit={submit}>
          <MagnifyingGlass size={16} aria-hidden="true" />
          <input
            ref={searchRef}
            type="text"
            value={query}
            placeholder="Search folders or enter a path"
            autoComplete="off"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
          />
          {loading ? <CircleNotch className="spin" size={15} aria-label="Loading directories" /> : null}
        </form>

        <div className="workspace-picker-location">
          <button type="button" onClick={() => onNavigate()} disabled={loading} aria-label="Go to home directory">
            <House size={14} />
          </button>
          <span title={listing?.path}>{listing?.path ?? "Loading home directory…"}</span>
        </div>

        <div className="workspace-picker-results" role="listbox" aria-label="Directories">
          {error ? <div className="workspace-picker-message error">{error}</div> : null}

          {!error && listing ? (
            <>
              <button
                className="workspace-current-directory"
                type="button"
                onClick={() => onSelect(listing.path)}
                disabled={loading}
              >
                <span className="workspace-picker-icon"><Check size={15} weight="bold" /></span>
                <span>
                  <strong>Use this folder</strong>
                  <small>{listing.path}</small>
                </span>
              </button>

              {listing.parent ? (
                <button
                  className="workspace-parent-directory"
                  type="button"
                  onClick={() => onNavigate(listing.parent)}
                  disabled={loading}
                >
                  <span className="workspace-picker-icon"><ArrowUp size={15} /></span>
                  <span>Parent directory</span>
                  <small>{listing.parent}</small>
                </button>
              ) : null}

              {filteredDirectories.map((directory) => (
                <div className="workspace-directory-option" role="option" aria-selected="false" key={directory.path}>
                  <button
                    className="workspace-directory-select"
                    type="button"
                    onClick={() => onSelect(directory.path)}
                    disabled={loading}
                    title={`Add ${directory.path}`}
                  >
                    <span className="workspace-picker-icon"><FolderSimple size={15} /></span>
                    <span>
                      <strong>{directory.name}</strong>
                      <small>{directory.path}</small>
                    </span>
                  </button>
                  <button
                    className="workspace-directory-open"
                    type="button"
                    onClick={() => onNavigate(directory.path)}
                    disabled={loading}
                    aria-label={`Open ${directory.name}`}
                    title={`Browse ${directory.path}`}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}

              {filteredDirectories.length === 0 ? (
                <div className="workspace-picker-message">No matching directories</div>
              ) : null}
              {listing.truncated ? (
                <div className="workspace-picker-message">Showing the first 500 directories</div>
              ) : null}
            </>
          ) : !error ? (
            <div className="workspace-picker-message">
              <CircleNotch className="spin" size={14} />
              Loading directories…
            </div>
          ) : null}
        </div>

      </section>
    </div>
  );
}
