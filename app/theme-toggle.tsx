"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "axodus-theme";
const THEME_CHANGE_EVENT = "axodus-theme-change";
let volatileTheme: Theme = "light";

function readStoredTheme(): Theme {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      volatileTheme = storedTheme;
    }
  } catch {
    // Fall back to the current tab when storage is unavailable.
  }
  return volatileTheme;
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function setDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, readStoredTheme, () => "light");

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  function handleToggle() {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    volatileTheme = nextTheme;
    setDocumentTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Keep the in-page theme usable when storage is unavailable.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <b>{theme === "light" ? "◐" : "◑"}</b>
    </button>
  );
}
