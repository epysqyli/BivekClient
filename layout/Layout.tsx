import type { ReactElement } from "react";
import ILayoutProps from "../interfaces/ILayoutProps";

const Layout = ({ children }: ILayoutProps): ReactElement => {
  return (
    <>
      <header className="bg-slate-300">HEADER</header>
      <main>{children}</main>
      <footer>FOOTER</footer>
    </>
  );
};

export default Layout;
