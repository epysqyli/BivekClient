import type ILayoutProps from "../interfaces/ILayoutProps";
import type { ReactElement } from "react";
import { useState } from "react";
import { OverlayProvider } from "../hooks/OverlayContext";
import { logout } from "../lib/Auth";
import Link from "next/link";
import { Globe, Settings, LogOut } from "react-feather";
import { useRouter } from "next/router";
import DarkModeToggle from "../components/DarkModeToggle";

const AdminLayout = ({ children }: ILayoutProps): ReactElement => {
  const [activeOverlay, setActiveOverlay] = useState(false);
  const showOverlay = () => setActiveOverlay(true);
  const hideOverlay = () => setActiveOverlay(false);

  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/admin");
  };

  return (
    <OverlayProvider value={{ showOverlay, hideOverlay }}>
      <header></header>
      <main className='pb-24'>{children}</main>
      <footer className='fixed bottom-0 w-full bg-neutral-200 dark:bg-slate-700 transition-opacity py-3 lg:py-0'>
        <div className='flex justify-around items-center w-4/5 mx-auto lg:w-1/2'>
          <Link href='/'>
            <Globe
              size={26}
              strokeWidth={1.5}
              className='cursor-pointer text-amber-600 hover:text-slate-800 dark:hover:text-slate-100 transition-transform hover:scale-95 active:scale-90'
            />
          </Link>
          <Link href='/admin'>
            <Settings
              size={26}
              strokeWidth={1.5}
              className='cursor-pointer text-amber-600 hover:text-slate-800 dark:hover:text-slate-100 transition-transform hover:scale-95 active:scale-90'
            />
          </Link>
          <LogOut
            onClick={handleLogout}
            size={26}
            strokeWidth={1.5}
            className='cursor-pointer text-amber-600 hover:text-slate-800 dark:hover:text-slate-100 transition-transform hover:scale-95 active:scale-90'
          />
          <div className='scale-75 '>
            <DarkModeToggle />
          </div>
        </div>
      </footer>
      {activeOverlay ? <div className='h-full w-full bg-slate-500 opacity-75 fixed top-0 z-10'></div> : null}
    </OverlayProvider>
  );
};

export default AdminLayout;
