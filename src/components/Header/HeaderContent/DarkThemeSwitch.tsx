import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../../providers/ThemeProvider";

const DarkThemeSwitch = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 
          ${darkMode ? "bg-dark-700" : "bg-gray-300"}
          dark:bg-dark-700`}
      onClick={toggleTheme}
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full transition-transform duration-300 ease-in-out 
            ${
              darkMode
                ? "translate-x-7 bg-secondary-300"
                : "translate-x-0.5 bg-light-50"
            }
            dark:translate-x-7 dark:bg-secondary-300`}
      />
      <span
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium 
            transition-opacity duration-300 select-none 
            ${
              darkMode
                ? "text-dark-500 opacity-60"
                : "text-secondary-600 opacity-100"
            }
            dark:text-dark-500 dark:opacity-60`}
      >
        <Sun size={12} />
      </span>

      <span
        className={`absolute right-2.5 top-1/2 transform -translate-y-1/2 text-xs font-medium 
            transition-opacity duration-300 select-none 
            ${
              darkMode
                ? "text-light-50 opacity-100"
                : "text-dark-600 opacity-60"
            }
            dark:text-light-50 dark:opacity-100`}
      >
        <Moon size={12} />
      </span>
    </div>
  );
};

export default DarkThemeSwitch;
