import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  flex-wrap: flex-wrap;
  align-items: center;
  padding: .5rem;
  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

export const DefaultContainer = styled.div`
  width: 100%;
  @media (min-width: 768px) {
    width: 33%;
  }
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

const HelpIcon = ({className, title, ...rest}) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...rest} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    {title && title.length && <title>{title}</title>}
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StyledHelpIcon = styled(HelpIcon)`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;  
`;