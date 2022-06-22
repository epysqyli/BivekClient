import type { ReactElement } from "react";
import { Menu } from "react-feather";
import ILayoutProps from "../interfaces/ILayoutProps";

const GuestLayout = ({ children }: ILayoutProps): ReactElement => {
  return (
    <>
      <header className='bg-slate-300 text-center'>HEADER</header>
      <main className='relative'>
        <div>{children}</div>
        <Menu
          size={40}
          className='absolute bg-white bottom-5 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90'
        />
      </main>
      <footer className='bg-slate-300 text-center'>FOOTER</footer>
    </>
  );
};

export default GuestLayout;
