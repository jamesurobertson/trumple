import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const setMode = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  return [theme, toggleTheme];
};
