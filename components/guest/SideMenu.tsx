import { ReactElement } from "react";
import SidebarLink from "./SidebarLink";
import { motion } from "framer-motion";
import { Database, Home, Info, Paperclip, Type, X, Youtube } from "react-feather";

interface Props {
  hideSidebar(): void;
}

const SideMenu = ({ hideSidebar }: Props): ReactElement => {
  return (
    <motion.div
      animate={{ translateY: [150, -30, 0], scaleY: [0.9, 1.05, 1] }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className='z-20 bg-slate-200 h-full w-full absolute top-0 right-0 pt-10'
    >
      <X
        size={40}
        onClick={hideSidebar}
        className='fixed bg-white bottom-12 right-5 p-2 rounded-full shadow-md shadow-slate-400 cursor-pointer transition-transform hover:scale-95 active:scale-90'
      />
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
    </motion.div>
  );
};

export default SideMenu;
