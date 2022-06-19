import type ILayoutProps from "../interfaces/ILayoutProps";
import type { ReactElement } from "react";
import { useState } from "react";
import { OverlayProvider } from "../hooks/OverlayContext";

const AdminLayout = ({ children }: ILayoutProps): ReactElement => {
  const [activeOverlay, setActiveOverlay] = useState(false);
  const overlay = "h-full w-full bg-slate-500 opacity-75 fixed top-0 z-10";
  const showOverlay = () => setActiveOverlay(true);
  const hideOverlay = () => setActiveOverlay(false);

  return (
    <OverlayProvider value={{ showOverlay, hideOverlay }}>
      <header className='bg-orange-200 text-center'>ADMIN LAYOUT HEADER</header>
      <main>{children}</main>
      <footer className='bg-orange-200 text-center'>ADMIN LAYOUT FOOTER</footer>
      {activeOverlay ? <div className={overlay}></div> : null}
    </OverlayProvider>
  );
};

export default AdminLayout;
