import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

<<<<<<< HEAD
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
`;

=======
>>>>>>> b8d4901b9a675778f2c30ff1fc0fbfb459936e70
const ThemeToggler = ({ theme, toggleTheme }) => {
  const Icon = theme === "light" ? SunIcon : MoonIcon;

  return (
    <div onClick={toggleTheme}>
      <Icon />
    </div>
  );
};

export default ThemeToggler;
