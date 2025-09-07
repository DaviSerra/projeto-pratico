import {
  useEffect,
  useState,
  useContext,
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useDarkMode = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a ThemeProvider");
  }
  return context;
};
