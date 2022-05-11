import ThemeToggler from "../ThemeToggler";
import { TitleContainer, Title, StyledHelpIcon, NavWrapper, NavContainer, DefaultContainer, HeaderWrapper } from "./Header.styles";

const Header = ({ toggleTheme, theme, resetFirstTimeUser }) => {
  const handleResetFirstTimeUser = () => resetFirstTimeUser(true);
  return (
    <HeaderWrapper>
      <DefaultContainer />
      <TitleContainer>
        <Title>TRUMPLE</Title>
      </TitleContainer>
      <NavContainer>
        <NavWrapper>
          <StyledHelpIcon onClick={handleResetFirstTimeUser} title={'Help'}/>
          <ThemeToggler toggleTheme={toggleTheme} theme={theme} />  
        </NavWrapper>
      </NavContainer>
    </HeaderWrapper>
  )
};

export default Header;
