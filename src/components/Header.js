import styled from "styled-components";
import ThemeToggler from "./ThemeToggler";

const Container = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
  font-size: 2.5rem;
`;

const Header = ({ toggleTheme, theme }) => {
  return (
    <Container>
      <Title>TRUMPLE</Title>
      <ThemeToggler toggleTheme={toggleTheme} theme={theme} />
    </Container>
  );
};

export default Header;
