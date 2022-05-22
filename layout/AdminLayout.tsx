import type ILayoutProps from "../interfaces/ILayoutProps";
import type { ReactElement } from "react";

const AdminLayout = ({ children }: ILayoutProps): ReactElement => {
  return (
    <>
      <header className="bg-orange-200 text-center">ADMIN LAYOUT HEADER</header>
      <main>{children}</main>
      <footer className="bg-orange-200 text-center">ADMIN LAYOUT FOOTER</footer>
    </>
  );
};

export default AdminLayout;
