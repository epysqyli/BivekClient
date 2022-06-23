import { ReactElement, ReactNode, useEffect } from "react";
import { Menu } from "react-feather";
import { useState } from "react";
import ILayoutProps from "../interfaces/ILayoutProps";
import SideMenuMobile from "../components/guest/SideMenuMobile";
import SideMenuDesktop from "../components/guest/SideMenuDesktop";
import { useRouter } from "next/router";
import { useIsNarrow } from "../hooks/UseMediaQuery";

const GuestLayout = ({ children }: ILayoutProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const openSidebar = (): void => setOpen(true);
  const hideSidebar = (): void => setOpen(false);
  const router = useRouter();
  const isIndex = (): boolean => (router.pathname === "/" ? true : false);
  const isNarrow = useIsNarrow();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => hideSidebar());
  }, [router.events]);

  const mainComponent = (children: ReactNode) => {
    if (isIndex() === true) return <main>{children}</main>;

    if (isIndex() === false && isNarrow === false) {
      return (
        <main className='flex'>
          <SideMenuDesktop />
          <main className='w-4/5'>{children}</main>
        </main>
      );
    }

    if (isIndex() === false && isNarrow === true) {
      return <main>{children}</main>;
    }
  };

  return (
    <>
      <header className='bg-slate-300 text-center z-10'>HEADER</header>
      {mainComponent(children)}
      <footer className='bg-slate-300 text-center z-10'>FOOTER</footer>
      <div className='lg:hidden'>
        {open ? (
          <SideMenuMobile hideSidebar={hideSidebar} />
        ) : (
          <Menu
            onClick={openSidebar}
            size={40}
            className='fixed bg-slate-400 text-white bottom-12 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90'
          />
        )}
      </div>
    </>
  );
};

export default GuestLayout;
