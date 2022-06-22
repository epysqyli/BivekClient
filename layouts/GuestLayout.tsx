import { ReactElement, useEffect } from "react";
import { Menu } from "react-feather";
import { useState } from "react";
import ILayoutProps from "../interfaces/ILayoutProps";
import SideMenu from "../components/guest/SideMenu";
import { useRouter } from "next/router";

const GuestLayout = ({ children }: ILayoutProps): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const openSidebar = (): void => setOpen(true);
  const hideSidebar = (): void => setOpen(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => hideSidebar());
  }, [router.events]);

  return (
    <>
      <header className='bg-slate-300 text-center'>HEADER</header>
      <main className='relative'>
        <div>{children}</div>
        {open ? (
          <SideMenu hideSidebar={hideSidebar} />
        ) : (
          <Menu
            onClick={openSidebar}
            size={40}
            className='fixed bg-slate-400 text-white bottom-12 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90'
          />
        )}
      </main>
      <footer className='bg-slate-300 text-center'>FOOTER</footer>
    </>
  );
};

export default GuestLayout;
