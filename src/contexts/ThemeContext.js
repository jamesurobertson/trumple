import { useEffect, useState, createContext, useContext, useMemo, useCallback } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme";

const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const setMode = (mode) => {
      localStorage.setItem("theme", mode);
      setTheme(mode);
    };
    theme === "light" ? setMode("dark") : setMode("light");
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
    </ThemeProvider>
  );
};

export { useTheme, ThemeContextProvider };
