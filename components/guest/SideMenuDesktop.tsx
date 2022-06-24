import { ReactElement } from "react";
import { Database, Home, Info, Paperclip, Type, X, Youtube } from "react-feather";
import SidebarLink from "./SidebarLink";

const SideMenuDesktop = (): ReactElement => {
  return (
    <div className='hidden lg:block bg-neutral-200 w-1/5 pt-16'>
      <SidebarLink pageLink='/' item='home' icon={<Home className='text-slate-500' />} />
      <SidebarLink pageLink='/articles' item='articles' icon={<Type className='text-slate-500' />} />
      <SidebarLink pageLink='/datasets' item='datasets' icon={<Database className='text-slate-500' />} />
      <SidebarLink
        pageLink='/working-papers'
        item='working papers'
        icon={<Paperclip className='text-slate-500' />}
      />
      <SidebarLink
        pageLink='/podcast-episodes'
        item='podcast episodes'
        icon={<Youtube className='text-slate-500' />}
      />
      <SidebarLink pageLink='/about' item='about' icon={<Info className='text-slate-500' />} />
    </div>
  );
};

export default SideMenuDesktop;
