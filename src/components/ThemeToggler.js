import styled from "styled-components";
import MoonIcon from "./MoonIcon";
import SunIcon from "./SunIcon";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
`;

const ThemeToggler = ({ onClick, theme }) => (
  <Container onClick={onClick}>
    {theme === "light" ? (
      <SunIcon onClick={onClick} />
    ) : (
      <MoonIcon onClick={onClick} />
    )}
  </Container>
);

export default ThemeToggler;
