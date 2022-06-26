import { ReactElement, ReactNode, useEffect } from "react";
import { useState } from "react";
import ILayoutProps from "../interfaces/ILayoutProps";
import SideMenuMobile from "../components/guest/SideMenuMobile";
import SideMenuDesktop from "../components/guest/SideMenuDesktop";
import { useRouter } from "next/router";
import { useIsNarrow } from "../hooks/UseMediaQuery";
import { Menu, X } from "react-feather";
import { checkLoginClientSide } from "../lib/Auth";
import Link from "next/link";

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
          <SideMenuDesktop isAdmin={isAdmin} />
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
      <header className='bg-neutral-300 text-center z-10'>HEADER</header>
      {mainElement(children)}
      <footer className='bg-neutral-300 text-center z-10 text-sm py-5'>
        <div>some random info</div>
        <div>link to other websites</div>
        <div>email address for contact</div>
        {isAdmin ? (
          <Link href='/admin'>
            <span className='block underline underline-offset-2 text-slate-700 my-3 cursor-pointer w-fit mx-auto'>
              admin section
            </span>
          </Link>
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
            className='fixed bg-slate-400 text-white bottom-12 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90 z-30'
          />
        )}
        <SideMenuMobile open={open} isAdmin={isAdmin} />
        {open && <SideMenuMobile open={open} isAdmin={isAdmin} />}
      </div>
    </>
  );
};

export default GuestLayout;