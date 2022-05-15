import { useFirstTimeUser } from '../../contexts/FirstTimeUserContext';
import styled from 'styled-components';
import HelpIcon from '../icons/HelpIcon';
import { useStats } from '../../contexts/StatsContext';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import StatisticsIcon from '../icons/StatisticsIcon';
import IconContainer from '../icons/Icon';

const Container = styled.header`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  font-size: 2.5rem;
`;

const LeftIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
`;

const RightIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  gap: 5px;
`;
const Header = ({ toggleTheme, theme }) => {
  const { resetFirstTimeUser } = useFirstTimeUser();
  const { toggleStatsModal } = useStats();
  const handleResetFirstTimeUser = () => resetFirstTimeUser(true);
  const ThemeIcon = theme === 'light' ? SunIcon : MoonIcon;
  return (
    <Container>
      <LeftIcons>
        <IconContainer title="Help" onClick={handleResetFirstTimeUser} Icon={HelpIcon} />
      </LeftIcons>
      <Title>TRUMPLE</Title>
      <RightIcons>
        <IconContainer title="Statistics" onClick={toggleStatsModal} Icon={StatisticsIcon} />
        <IconContainer title="Toggle Theme" onClick={toggleTheme} Icon={ThemeIcon} />
      </RightIcons>
    </Container>
  );
};

export default Header;
