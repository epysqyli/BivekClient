import { ReactElement } from "react";
import { Database, Home, Info, Paperclip, Settings, Type } from "react-feather";
import SidebarLink from "./SidebarLink";

const DesktopMenu = ({ isAdmin }: { isAdmin: boolean }): ReactElement => {
  const iconStyle =
    "text-slate-500 group-hover:text-amber-600 lg:text-white group-hover:scale-105 transition-all group-active:scale-110";

  return (
    <div className='hidden lg:block bg-slate-500 dark:bg-slate-600 w-1/5 relative'>
      <div className='fixed w-1/5'>
        <SidebarLink pageLink='/' item='home' icon={<Home className={iconStyle} />} />
        <SidebarLink pageLink='/articles' item='articles' icon={<Type className={iconStyle} />} />
        <SidebarLink pageLink='/datasets' item='datasets' icon={<Database className={iconStyle} />} />
        <SidebarLink
          pageLink='/research-papers'
          item='research papers'
          icon={<Paperclip className={iconStyle} />}
        />
        <SidebarLink pageLink='/about' item='about' icon={<Info className={iconStyle} />} />
        {isAdmin ? (
          <SidebarLink pageLink='/admin' item='admin section' icon={<Settings className={iconStyle} />} />
        ) : null}
      </div>
    </div>
  );
};

export default DesktopMenu;
