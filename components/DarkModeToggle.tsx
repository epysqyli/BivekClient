import { ReactElement, useContext } from "react";
import { Moon, Sun } from "react-feather";
import { DarkModeContext } from "../hooks/DarkModeContext";

const DarkModeToggle = (): ReactElement => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      {isDarkMode() ? (
        <div
          onClick={() => toggleDarkMode()}
          className='py-5 mx-auto border-b-2 border-amber-400 cursor-pointer'
        >
          <Sun size={36} strokeWidth={1.5} fill='#fbbf24' className='w-min mx-auto text-amber-400' />
        </div>
      ) : (
        <div
          onClick={() => toggleDarkMode()}
          className='py-5 mx-auto border-b-2 border-neutral-400 hover:border-neutral-200 group cursor-pointer'
        >
          <Moon size={36} strokeWidth={1.5} fill='#737373' className='w-min mx-auto text-neutral-400 group-hover:text-neutral-200' />
        </div>
      )}
    </>
  );
};

export default DarkModeToggle;
