import type { ReactElement } from "react";
import ILayoutProps from "../interfaces/ILayoutProps";

const GuestLayout = ({ children }: ILayoutProps): ReactElement => {
  return (
    <>
      <header className="bg-slate-300 text-center">HEADER</header>
      <main>{children}</main>
      <footer className="bg-slate-300 text-center">FOOTER</footer>
    </>
  );
};

export default GuestLayout;
