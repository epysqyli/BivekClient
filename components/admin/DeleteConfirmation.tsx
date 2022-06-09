import { useState } from "react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { deleteArticle } from "../../lib/ArticleRepo";
import { XCircle } from "react-feather";

interface Props {
  id: number;
  show: boolean;
  hideShow: () => void;
}

const DeleteConfirmation = ({ id, show, hideShow }: Props): ReactElement => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const router = useRouter();

  const redirectToEditindex = () => router.push("/admin/edit-articles");

  const handleDelete = async (id: number): Promise<void> => {
    await deleteArticle(id);
    setIsDeleted(true);
    setTimeout(redirectToEditindex, 2000);
  };

  if (show)
    return (
      <div className='py-10 px-5 w-2/3 bg-white mx-auto text-center fixed top-1/2 left-1/2 -translate-x-1/2 shadow-lg shadow-slate-500 rounded-md'>
        <div>Confirm below to permanently delete this article</div>
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
