import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
`;

export const DefaultContainer = styled.div`
  width: 100%;
`;

export const TitleContainer = styled(DefaultContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavContainer = styled(DefaultContainer)`
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-between;
  justify-self: center;
  align-self: center;
  font-family: "Clear Sans", "Helvetica Neue", "Arial", "sans-serif";
  font-size: 2.5rem;
`;

export const NavWrapper = styled.nav`
  align-self: flex-end;
  display: flex;
  align-items: baseline;
`;

export const HelpIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
`;
