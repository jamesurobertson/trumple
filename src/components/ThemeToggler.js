import styled from "styled-components";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

const ThemeToggler = ({ theme, toggleTheme }) => {
  const Icon = theme === "light" ? SunIcon : MoonIcon;

  return (
    <div onClick={toggleTheme}>
      <Icon />
    </div>
  );
};

export default ThemeToggler;
