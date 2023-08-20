import { MoonIcon, SunIcon, Switch } from '.';

const DarkMode = ({ theme, setTheme }) => {
  return (
    <article className="flex justify-between items-center">
      <SunIcon />
      <Switch theme={theme} setTheme={setTheme} />
      <MoonIcon />
    </article>
  );
};

export default DarkMode;
