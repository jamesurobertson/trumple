import { useFirstTimeUser } from "../../contexts/FirstTimeUserContext";
import HeaderIcons from "../icons/HeaderIcons";
import HelpIcon from "../icons/HelpIcon";
import { TitleContainer, Title, HelpIconContainer, HeaderWrapper } from "./Header.styles";

const Header = ({ toggleTheme, theme }) => {
  const { resetFirstTimeUser } = useFirstTimeUser();
  const handleResetFirstTimeUser = () => resetFirstTimeUser(true);
  return (
    <HeaderWrapper>
      <HelpIconContainer onClick={handleResetFirstTimeUser} title={"Help"}>
        <HelpIcon />
      </HelpIconContainer>
      <TitleContainer>
        <Title>TRUMPLE</Title>
      </TitleContainer>
      <HeaderIcons toggleTheme={toggleTheme} theme={theme} />
    </HeaderWrapper>
  );
};

export default Header;
