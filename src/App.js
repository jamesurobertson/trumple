import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import Header from "./components/Header";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useTheme } from "./hooks/useTheme";
import { StatsModalContextProvider } from "./contexts/StatsContext";
import { FirstTimeUserModalContextProvider } from "./contexts/FirstTimeUserContext";

function App() {
  const [theme, toggleTheme] = useTheme();
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StatsModalContextProvider>
        <FirstTimeUserModalContextProvider>
          <Header toggleTheme={toggleTheme} />
          <Game />
        </FirstTimeUserModalContextProvider>
      </StatsModalContextProvider>
    </ThemeProvider>
  );
}

export default App;
