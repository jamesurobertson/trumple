import styled from "styled-components";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  position: absolute;
  right: 10px;
`;

const ThemeToggler = ({ theme, toggleTheme }) => {
  const Icon = theme === "light" ? SunIcon : MoonIcon;

  return (
    <Container onClick={toggleTheme}>
      <Icon />
    </Container>
  );
};

export default ThemeToggler;
