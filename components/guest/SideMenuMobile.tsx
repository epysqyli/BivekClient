import { ReactElement } from "react";
import SidebarLink from "./SidebarLink";
import { AnimatePresence, motion } from "framer-motion";
import { Database, Home, Info, Paperclip, Type, X, Youtube } from "react-feather";

interface Props {
  open: boolean;
}

const SideMenu = ({ open }: Props): ReactElement => (
  <AnimatePresence>
    {open && (
      <motion.div
        animate={{ y: [100, -30, 0], scaleY: [0.9, 1.05, 1] }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        exit={{ opacity: [0.8, 0], scale: [1, 0.95] }}
        className='z-20 bg-neutral-200 h-full w-full fixed top-0 right-0 pt-10'
      >
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
    )}
  </AnimatePresence>
);

export default SideMenu;
