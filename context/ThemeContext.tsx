"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Permanently force light mode
  const [theme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Remove any legacy theme preference from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("theme");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      // Always ensure "dark" class is removed
      root.classList.remove("dark");
    }
  }, [mounted]);

  // Make toggleTheme a no-op to maintain permanent light mode
  const toggleTheme = () => {
    console.log("Theme is fixed to light mode.");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
