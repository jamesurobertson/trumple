import styled from "styled-components";
import HeaderIcons from "./icons/HeaderIcons";

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

const Header = ({ toggleTheme, theme, toggleStatsModal }) => (
  <Container>
    <Title>TRUMPLE</Title>
    <HeaderIcons toggleTheme={toggleTheme} theme={theme} toggleStatsModal={toggleStatsModal} />
  </Container>
);

export default Header;
