import { ReactElement, useContext } from "react";
import SidebarLink from "./SidebarLink";
import { AnimatePresence, motion } from "framer-motion";
import { Database, Home, Info, Paperclip, Settings, Type } from "react-feather";
import { DarkModeContext } from "../../hooks/DarkModeContext";

interface Props {
  open: boolean;
  isAdmin: boolean;
}

const MobileMenu = ({ open, isAdmin }: Props): ReactElement => {
  const iconStyle = "text-amber-700";
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          animate={{ y: [100, -30, 0], scaleY: [0.9, 1.05, 1] }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          exit={{ opacity: [0.8, 0], scale: [1, 0.95] }}
          className='z-20 bg-neutral-200 h-full w-full fixed top-0 right-0'
        >
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
          <div onClick={() => toggleDarkMode()} className="text-center py-4">switch mode</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
