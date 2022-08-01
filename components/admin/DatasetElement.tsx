import type { Dispatch, ReactElement, SetStateAction } from "react";
import type IDataset from "../../interfaces/models/IDataset";
import { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import DatasetForm from "./DatasetForm";

interface Props {
  dataset: IDataset;
  setCurrentDatasetId: Dispatch<SetStateAction<number>>;
  replaceDatasetsInState(dataset: IDataset): void;
  showDeleteConfirmation(): void;
}

const DatasetElement = ({
  dataset,
  setCurrentDatasetId,
  replaceDatasetsInState,
  showDeleteConfirmation
}: Props): ReactElement => {
  const [showDatasetEditForm, setShowDatasetEditForm] = useState<boolean>(false);
  const showEditForm = () => setShowDatasetEditForm(true);
  const hideEditForm = () => setShowDatasetEditForm(false);

  const handleClick = () => {
    setCurrentDatasetId(dataset.id);
    showDeleteConfirmation();
  };

  return (
    <>
      {showDatasetEditForm ? (
        <DatasetForm
          currentDataset={dataset}
          dataCategoryId={dataset.dataCategoryId}
          hideForm={hideEditForm}
          replaceDatasetsInState={replaceDatasetsInState}
        />
      ) : (
        <>
          <div className='w-5/6'>
            <div className='text-gray-500 dark:text-slate-300 text-sm'>title</div>
            <div className='text-gray-900 dark:text-slate-100 text-sm'>{dataset.title}</div>
          </div>
          <div className='mt-2 w-5/6'>
            <div className='text-gray-500 dark:text-slate-300 text-sm'>download link</div>
            <div className='text-gray-900 dark:text-slate-100 text-sm'>{dataset.link}</div>
          </div>
          <div className='absolute top-1 right-1'>
            <Edit
              className='text-gray-500 dark:text-slate-100 cursor-pointer transition-transform hover:scale-95 active:scale-90'
              onClick={showEditForm}
              size={20}
              aria-label='show-edit-dataset-form'
              role='button'
            />
            <Trash2
              onClick={handleClick}
              size={20}
              className='text-gray-500 dark:text-slate-100 mt-3 cursor-pointer transition-transform hover:scale-95 active:scale-90'
              aria-label='delete-dataset'
              role='button'
            />
          </div>
        </>
      )}
    </>
  );
};

export default DatasetElement;
