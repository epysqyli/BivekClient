import { createContext } from "react";

interface DarkMode {
  toggleDarkMode: Function;
}

const toggleDarkModeCallback = (toggleDarkModeFn: Function) => toggleDarkModeFn();

const DarkModeContext = createContext<DarkMode>({
  toggleDarkMode: toggleDarkModeCallback,
});

const DarkModeProvider = DarkModeContext.Provider;

export { DarkModeContext, DarkModeProvider };
