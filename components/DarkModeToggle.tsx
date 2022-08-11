import { ReactElement, useContext } from "react";
import { Moon, Sun } from "react-feather";
import { DarkModeContext } from "../hooks/DarkModeContext";

const DarkModeToggle = (): ReactElement => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const lightStyle = "py-2 lg:py-5 mx-auto border-b-2 border-amber-400 cursor-pointer";
  const darkStyle =
    "py-2 lg:py-5 mx-auto border-b-2 border-neutral-400 hover:border-neutral-200 group cursor-pointer";

  const sunIcon: ReactElement = (
    <Sun size={36} strokeWidth={1.5} fill='#fbbf24' className='w-min mx-auto text-amber-400' />
  );

  const moonIcon: ReactElement = (
    <Moon
      size={36}
      strokeWidth={1.5}
      fill='#737373'
      className='w-min mx-auto text-neutral-400 group-hover:text-neutral-200'
    />
  );

  return (
    <>
      <div onClick={() => toggleDarkMode()} className={isDarkMode() ? darkStyle : lightStyle}>
        {isDarkMode() ? sunIcon : moonIcon}
      </div>
    </>
  );
};

export default DarkModeToggle;
