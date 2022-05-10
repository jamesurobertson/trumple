import styled from "styled-components";
import StatisticsIcon from "./StatisticsIcon";
import ThemeToggler from "../ThemeToggler";

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  padding: 10px;
  gap: 5px;
`;

const HeaderIcons = ({ toggleTheme, theme, toggleStatsModal }) => (
  <IconsContainer>
    <div onClick={toggleStatsModal}>
      <StatisticsIcon toggleStatsModal={toggleStatsModal} />
    </div>
    <ThemeToggler toggleTheme={toggleTheme} theme={theme} />
  </IconsContainer>
);

export default HeaderIcons;
