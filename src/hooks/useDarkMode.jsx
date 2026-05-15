// src/hooks/useDarkMode.jsx
import { useEffect, useState } from "react";

export default function useDarkMode() {
  const getInitial = () => {
    if (typeof window === "undefined") return "system";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
    return "system";
  };

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const root = document.documentElement;
    const resolvedTheme = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : theme;

    root.dataset.theme = resolvedTheme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listener for system preference changes when in 'system' mode
  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const resolvedTheme = e.matches ? "dark" : "light";
      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.classList.toggle("dark", e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return [theme, setTheme];
}
