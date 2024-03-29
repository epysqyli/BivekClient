import { ReactElement, ReactNode, useEffect } from "react";
import { useState } from "react";
import ILayoutProps from "../interfaces/ILayoutProps";
import MobileMenu from "../components/guest/MobileMenu";
import DesktopMenu from "../components/guest/DesktopMenu";
import { useRouter } from "next/router";
import { useIsNarrow } from "../hooks/UseMediaQuery";
import { Instagram, Linkedin, Menu, X } from "react-feather";
import { checkLoginClientSide } from "../lib/Auth";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import { Mail } from "react-feather";

const GuestLayout = ({ children }: ILayoutProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const openSidebar = (): void => setOpen(true);
  const hideSidebar = (): void => setOpen(false);
  const router = useRouter();
  const isIndex = (): boolean => (router.pathname === "/" ? true : false);
  const isNarrow = useIsNarrow();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const checkAuth = async () => setIsAdmin(await checkLoginClientSide());

  useEffect(() => {
    router.events.on("routeChangeStart", () => checkAuth());
    return () => router.events.off("routeChangeComplete", () => {});
  }, [router.events]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => hideSidebar());
  }, [router.events]);

  const mainElement = (children: ReactNode) => {
    if (isIndex() === true) return <main>{children}</main>;

    if (isIndex() === false && isNarrow === false) {
      return (
        <main className='flex'>
          <DesktopMenu isAdmin={isAdmin} />
          <main className='w-4/5 pb-20'>{children}</main>
        </main>
      );
    }

    if (isIndex() === false && isNarrow === true) {
      return <main>{children}</main>;
    }
  };

  return (
    <>
      <header></header>
      {mainElement(children)}
      <footer className='bg-slate-500 dark:bg-slate-900 text-center z-10 text-sm py-10 text-slate-50'>
        <div className='mx-auto flex items-center justify-center gap-4'>
          <div className='cursor-pointer'>
            <Link href='https://www.linkedin.com/in/bivek-neupane-6478b9177/'>
              <Linkedin />
            </Link>
          </div>
          <div className='cursor-pointer'>
            <Link href='https://www.instagram.com/bivineu/'>
              <Instagram />
            </Link>
          </div>
        </div>
        <div className='my-5 w-min mx-auto flex gap-5'>
          <Mail /> Bivek.Neupane@hsrw.org
        </div>
        {isAdmin ? (
          <Link href='/admin'>
            <span className='block underline underline-offset-2 text-slate-100 my-10 cursor-pointer w-fit mx-auto'>
              admin section
            </span>
          </Link>
        ) : null}

        {router.pathname == "/" ? (
          <div className='w-1/2 lg:w-1/5 mx-auto'>
            <DarkModeToggle />
          </div>
        ) : null}
      </footer>
      <div className='lg:hidden'>
        {open ? (
          <X
            size={40}
            onClick={hideSidebar}
            className='fixed bg-white bottom-12 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90 z-30'
          />
        ) : (
          <Menu
            onClick={openSidebar}
            size={40}
            className='fixed bg-slate-400 text-white bottom-12 right-5 p-2 rounded-full shadow-slate-700 shadow-md cursor-pointer transition-transform hover:scale-95 active:scale-90 z-30'
          />
        )}
        <MobileMenu open={open} isAdmin={isAdmin} />
        {open && <MobileMenu open={open} isAdmin={isAdmin} />}
      </div>
    </>
  );
};

export default GuestLayout;
