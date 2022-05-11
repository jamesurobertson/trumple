import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import Header from "./components/Header";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useTheme } from "./hooks/useTheme";
import FirstTimeUserModal from "./components/FirstTimeUserModal";

var firstTimeUser = true; // fake localStorage req

function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Game />
      {firstTimeUser && <FirstTimeUserModal theme={theme}/>}
    </ThemeProvider>
  );
}

export default App;
