import { useThemesContext } from "../context";

export const useThemes = () => {
  const { theme, setTheme, toggleTheme } = useThemesContext();

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};
