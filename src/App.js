import { useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import Game from "./components/Game";
import Header from "./components/Header";
import { darkTheme, lightTheme } from "./theme";

const Container = styled.div`
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
  display: flex;
  flex-direction: column;
`;

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Container>
        <Header />
        <Game />
      </Container>
    </ThemeProvider>
  );
}

export default App;
