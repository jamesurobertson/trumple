import styled from "styled-components";
import ThemeToggler from "./ThemeToggler";

const Container = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cont = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.tileBorderUnfilled};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
  font-size: 2.5rem;
`;

const ToggleContainer = styled.div`
  position: absolute;
  right: 10px;
`;

const Header = ({ onClick, theme }) => {
  return (
    <Container>
      <Cont>TRUMPLE</Cont>
      <ToggleContainer>
        <ThemeToggler onClick={onClick} theme={theme} />
      </ToggleContainer>
    </Container>
  );
};

export default Header;
