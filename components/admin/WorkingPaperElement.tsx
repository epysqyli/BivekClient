import type { ReactElement } from "react";
import type IWorkingPaper from "../../interfaces/IWorkingPaper";
import { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import DeleteConfirmation from "./DeleteConfirmation";
import { deleteWorkingPaper } from "../../lib/WorkingPaperRepo";
import WorkingPaperForm from "./WorkingPaperForm";

interface Props {
  workingPaper: IWorkingPaper;
  replaceWorkingPapersInState(workingPaper: IWorkingPaper): void;
  removeWorkingPaperFromState(id: number): void;
}

const WorkingPaperElement = ({
  workingPaper,
  replaceWorkingPapersInState,
  removeWorkingPaperFromState
}: Props): ReactElement => {
  const [showEditform, setShowEditForm] = useState<boolean>(false);
  const showForm = () => setShowEditForm(true);
  const hideForm = () => setShowEditForm(false);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const showDeleteConfirmation = () => setShowDelete(true);
  const hideDeleteConfirmation = () => setShowDelete(false);

  return (
    <>
      {showEditform ? (
        <WorkingPaperForm
          currentWorkingPaper={workingPaper}
          hideForm={hideForm}
          replaceWorkingPapersInState={replaceWorkingPapersInState}
        />
      ) : (
        <div className='relative ml-2'>
          <div className='text-sm w-5/6'>
            <div className='text-gray-500'>title</div>
            <div className='text-gray-900'>{workingPaper.title}</div>
          </div>
          <div className='mt-3 text-sm text-justify w-5/6'>
            <div className='text-gray-500'>abstract</div>
            <div className='text-gray-900'>{workingPaper.abstract}</div>
          </div>
          <div className='mt-3 text-sm w-5/6'>
            <div className='text-gray-500'>link</div>
            <div className='text-gray-900'>{workingPaper.link}</div>
          </div>
          <div className='absolute top-1 right-1'>
            <Edit
              className='text-gray-500 cursor-pointer transition-transform hover:scale-95 active:scale-90'
              onClick={showForm}
              size={20}
            />
            <Trash2
              onClick={showDeleteConfirmation}
              size={20}
              className='text-gray-500 mt-3 cursor-pointer transition-transform hover:scale-95 active:scale-90'
            />
          </div>
          <DeleteConfirmation
            id={workingPaper.id}
            show={showDelete}
            hideShow={hideDeleteConfirmation}
            deleteItem={deleteWorkingPaper}
            updateStateAfterDelete={removeWorkingPaperFromState}
            resourceType='working paper'
          />
        </div>
      )}
    </>
  );
};

export default WorkingPaperElement;
