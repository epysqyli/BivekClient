import { ReactElement } from "react";
import { Database, Home, Info, Paperclip, Settings, Type } from "react-feather";
import SidebarLink from "./SidebarLink";

const SideMenuDesktop = ({ isAdmin }: { isAdmin: boolean }): ReactElement => {
  return (
    <div className='hidden lg:block bg-neutral-200 w-1/5 relative'>
      <div className='fixed w-1/5'>
        <SidebarLink pageLink='/' item='home' icon={<Home className='text-slate-500' />} />
        <SidebarLink pageLink='/articles' item='articles' icon={<Type className='text-slate-500' />} />
        <SidebarLink pageLink='/datasets' item='datasets' icon={<Database className='text-slate-500' />} />
        <SidebarLink
          pageLink='/research-papers'
          item='research papers'
          icon={<Paperclip className='text-slate-500' />}
        />
        <SidebarLink pageLink='/about' item='about' icon={<Info className='text-slate-500' />} />
        {isAdmin ? (
          <SidebarLink
            pageLink='/admin'
            item='admin section'
            icon={<Settings className='text-slate-500' />}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SideMenuDesktop;
