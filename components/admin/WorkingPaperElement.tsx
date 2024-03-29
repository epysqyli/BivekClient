import { Dispatch, ReactElement, SetStateAction } from "react";
import type IWorkingPaper from "../../interfaces/models/IWorkingPaper";
import { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import WorkingPaperForm from "./WorkingPaperForm";

interface Props {
  workingPaper: IWorkingPaper;
  setCurrentWorkingPaperId: Dispatch<SetStateAction<number>>;
  replaceWorkingPapersInState(workingPaper: IWorkingPaper): void;
  showDeleteConfirmation(): void;
}

const WorkingPaperElement = ({
  workingPaper,
  setCurrentWorkingPaperId,
  showDeleteConfirmation,
  replaceWorkingPapersInState
}: Props): ReactElement => {
  const [showEditform, setShowEditForm] = useState<boolean>(false);
  const showForm = () => setShowEditForm(true);
  const hideForm = () => setShowEditForm(false);

  const handleClick = () => {
    setCurrentWorkingPaperId(workingPaper.id);
    showDeleteConfirmation();
  };

  return (
    <>
      {showEditform ? (
        <WorkingPaperForm
          currentWorkingPaper={workingPaper}
          replaceWorkingPapersInState={replaceWorkingPapersInState}
          hideForm={hideForm}
        />
      ) : (
        <div className='relative ml-2'>
          <div className='text-sm w-5/6'>
            <div className='text-gray-500 dark:text-slate-300'>title</div>
            <div className='text-gray-900 dark:text-slate-100'>{workingPaper.title}</div>
          </div>
          <div className='mt-3 text-sm text-justify w-5/6'>
            <div className='text-gray-500 dark:text-slate-300'>abstract</div>
            <div className='text-gray-900 dark:text-slate-100'>{workingPaper.abstract}</div>
          </div>
          <div className='mt-3 text-sm w-5/6'>
            <div className='text-gray-500 dark:text-slate-300'>link</div>
            <div className='text-gray-900 dark:text-slate-100'>{workingPaper.link}</div>
          </div>
          {workingPaper.datasetLink ? (
            <div className='mt-3 text-sm w-5/6'>
              <div className='text-gray-500 dark:text-slate-300'>dataset link</div>
              <div className='text-gray-900 dark:text-slate-100'>{workingPaper.datasetLink}</div>
            </div>
          ) : null}
          <div className='absolute top-1 right-1'>
            <Edit
              className='text-gray-500 dark:text-slate-100 cursor-pointer transition-transform hover:scale-95 active:scale-90'
              onClick={showForm}
              size={20}
              role='button'
              aria-label='edit-working-paper'
            />
            <Trash2
              onClick={handleClick}
              size={20}
              className='text-gray-500 dark:text-slate-100 mt-3 cursor-pointer transition-transform hover:scale-95 active:scale-90'
              role='button'
              aria-label='show-delete-working-paper-button'
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WorkingPaperElement;
