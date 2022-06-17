import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { XCircle } from "react-feather";
import { AxiosResponse } from "axios";

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
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const router = useRouter();

  const redirect = () => {
    if (redirectPath !== undefined) router.push(redirectPath);
  };

  const handleDelete = async (id: number): Promise<void> => {
    await deleteItem(id);
    setIsDeleted(true);
    if (redirectPath !== undefined) {
      setTimeout(redirect, 2000);
    } else {
      if (updateStateAfterDelete) updateStateAfterDelete(id);
    }
  };

  if (show)
    return (
      <div className='py-10 px-5 w-2/3 bg-white z-10 mx-auto text-center fixed top-1/2 left-1/2 -translate-x-1/2 shadow-lg shadow-slate-500 rounded-md'>
        <div>Confirm below to permanently delete this {resourceType}</div>
        <div onClick={() => handleDelete(id)}>
          {isDeleted ? (
            <div className='bg-amber-700 text-white py-2 mt-5 w-4/5 mx-auto rounded border border-transparent'>
              <p>Gone forever!</p>
              <p className='text-sm mt-2 text-gray-100'>redirecting ... </p>
            </div>
          ) : (
            <div className='bg-white text-amber-700 py-2 mt-5 w-4/5 mx-auto rounded border border-amber-700 cursor-pointer hover:text-white hover:bg-amber-700 active:bg-amber-900'>
              delete
            </div>
          )}
        </div>
        <div>
          <XCircle
            strokeWidth={1.5}
            onClick={hideShow}
            className='absolute top-0 right-0 m-2 text-slate-600 cursor-pointer hover:scale-95 active:scale-75'
          />
        </div>
      </div>
    );

  return <></>;
};

export default DeleteConfirmation;
