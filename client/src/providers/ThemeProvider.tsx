import React, { createContext, useEffect, useState } from "react";
import type { ThemeContextType } from "../types/ThemeContext.types";

const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("Theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("Theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("Theme", "light");
    }
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
export default ThemeProvider;
