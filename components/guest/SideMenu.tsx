import { ReactElement } from "react";
import SidebarLink from "./SidebarLink";
import { X } from "react-feather";

interface Props {
  hideSidebar(): void;
}

const SideMenu = ({ hideSidebar }: Props): ReactElement => {
  return (
    <div className='z-20 bg-slate-200 h-full w-full absolute top-0 right-0 pt-10'>
      <X
        size={40}
        onClick={hideSidebar}
        className='absolute bg-white bottom-5 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90'
      />
      <SidebarLink pageLink='/articles' item='articles' />
      <SidebarLink pageLink='/datasets' item='datasets' />
      <SidebarLink pageLink='/working-papers' item='working papers' />
      <SidebarLink pageLink='/podcast-episodes' item='podcast episodes' />
      <SidebarLink pageLink='/about' item='about' />
    </div>
  );
};

export default SideMenu;
