import styled from "styled-components";
import StatisticsIcon from "./StatisticsIcon";
import ThemeToggler from "../ThemeToggler";
import { useStats } from "../../contexts/StatsContext";

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  
`;

const HeaderIcons = ({ toggleTheme, theme }) => {
  const { toggleStatsModal } = useStats();
  return (
    <IconsContainer>
      <div onClick={toggleStatsModal}>
        <StatisticsIcon />
      </div>
      <ThemeToggler toggleTheme={toggleTheme} theme={theme} />
    </IconsContainer>
  );
};
export default HeaderIcons;
