import { ThemeContextProvider } from "../contexts/ThemeContext";
import { GameStateContextProvider } from "../contexts/GameStateContext";
import { StatsContextProvider } from "../contexts/StatsContext";
import { GlobalStyles } from "../global";

const Providers = ({ children }) => (
  <ThemeContextProvider>
    <GlobalStyles />
    <GameStateContextProvider>
      <StatsContextProvider>{children}</StatsContextProvider>
    </GameStateContextProvider>
  </ThemeContextProvider>
);

export default Providers;
