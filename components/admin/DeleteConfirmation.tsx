import type { ReactElement } from "react";
import type { AxiosResponse } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { XCircle } from "react-feather";

interface Props {
  id: number;
  show: boolean;
  hideShow: () => void;
  resourceType: string;
  deleteItem: (id: number) => Promise<AxiosResponse>;
  redirectPath?: string;
  updateStateAfterDelete?: (id: number) => void;
}

const DeleteConfirmation = ({
  id,
  show,
  hideShow,
  resourceType,
  deleteItem,
  redirectPath,
  updateStateAfterDelete
}: Props): ReactElement => {
  const router = useRouter();

  const redirect = () => {
    if (redirectPath !== undefined) {
      hideShow();
      router.push(redirectPath);
    }
  };

  const handleDelete = async (): Promise<void> => {
    await deleteItem(id);

    if (redirectPath !== undefined) {
      redirect();
    } else {
      if (updateStateAfterDelete) {
        updateStateAfterDelete(id);
        hideShow();
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={{ scale: [0.5, 1.1, 1] }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: [1, 0] }}
          style={{ position: "fixed", top: "33%", left: "50%", translateX: "-50%" }}
          className='py-10 px-5 w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white z-20 mx-auto text-center shadow-lg shadow-slate-500 rounded-md'
        >
          <div>Confirm below to permanently delete this {resourceType}</div>
          <div
            onClick={handleDelete}
            className='bg-white text-amber-700 py-2 mt-5 w-4/5 mx-auto rounded border border-amber-700 cursor-pointer hover:text-white hover:bg-amber-700 active:bg-amber-900'
          >
            delete
          </div>
          <XCircle
            strokeWidth={1.5}
            onClick={hideShow}
            className='absolute top-0 right-0 m-2 text-slate-600 cursor-pointer hover:scale-95 active:scale-75'
            role='button'
            aria-label='close-delete-button'
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;
