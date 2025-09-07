import DarkThemeSwitch from "./HeaderContent/DarkThemeSwitch";
import Logo from "./HeaderContent/Logo";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-light-50/20 dark:bg-dark-900/20 backdrop-blur-sm border-b border-gray-300 dark:border-dark-700/60">
      <div className="max-w-8xl mx-auto py-3 px-4 sm:py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Logo />
          <DarkThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
