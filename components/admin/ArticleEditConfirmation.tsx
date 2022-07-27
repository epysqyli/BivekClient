import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";

interface Props {
  text: string;
  show: boolean;
}

const ArticleEditConfirmation = ({ text, show }: Props): ReactElement => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={{ y: ["-100vh", "10vh", "0vh"] }}
          transition={{ duration: 0.5 }}
          exit={{ y: ["0vh", "-10vh", "100vh"] }}
          style={{ position: "absolute", top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
          className='px-20 py-12 rounded-md border-2 border-amber-600 bg-slate-600 shadow-lg z-20 shadow-slate-500'
        >
          <span className='block text-center text-4xl tracking-tight text-white'>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleEditConfirmation;
