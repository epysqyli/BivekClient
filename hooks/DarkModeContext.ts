import { createContext } from "react";

interface DarkMode {
  toggleDarkMode: Function;
  isDarkMode: Function;
}

const toggleDarkModeCallback = (toggleDarkModeFn: Function) => toggleDarkModeFn();
const isDarkModeCallback = (isDarkModeFn: Function) => isDarkModeFn();

const DarkModeContext = createContext<DarkMode>({
  toggleDarkMode: toggleDarkModeCallback,
  isDarkMode: isDarkModeCallback
});

const DarkModeProvider = DarkModeContext.Provider;

export { DarkModeContext, DarkModeProvider };
