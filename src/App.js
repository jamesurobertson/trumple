import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import Header from "./components/Header";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useTheme } from "./hooks/useTheme";
import { StatsModalContextProvider } from "./contexts/StatsContext";

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StatsModalContextProvider>
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Game />
      </StatsModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
