import { ReactElement, useContext } from "react";
import type IDataset from "../../interfaces/models/IDataset";
import { useState } from "react";
import { deleteDataset } from "../../lib/DatasetRepo";
import DeleteConfirmation from "./DeleteConfirmation";
import DatasetEditForm from "./DatasetEditForm";
import { Edit, Trash2 } from "react-feather";
import { OverlayContext } from "../../hooks/OverlayContext";

interface Props {
  dataset: IDataset;
  removeDatasetFromState(id: number): void;
  replaceDatasetsInState(dataset: IDataset): void;
}

const DatasetElement = ({ dataset, removeDatasetFromState, replaceDatasetsInState }: Props): ReactElement => {
  const [showDatasetEditForm, setShowDatasetEditForm] = useState<boolean>(false);
  const showEditForm = () => setShowDatasetEditForm(true);
  const hideEditForm = () => setShowDatasetEditForm(false);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { showOverlay, hideOverlay } = useContext(OverlayContext);
  const showDeleteConfirmation = () => {
    setShowDelete(true);
    showOverlay();
  };
  const hideDeleteConfirmation = () => {
    setShowDelete(false);
    hideOverlay();
  };

  return (
    <>
      {showDatasetEditForm ? (
        <DatasetEditForm
          currentDataset={dataset}
          hideForm={hideEditForm}
          replaceDatasetsInState={replaceDatasetsInState}
        />
      ) : (
        <>
          <div>
            <div className='text-gray-500 text-sm'>title</div>
            <div className='text-gray-900 text-sm'>{dataset.title}</div>
          </div>
          <div className='mt-2'>
            <div className='text-gray-500 text-sm'>download link</div>
            <div className='text-gray-900 text-sm'>{dataset.link}</div>
          </div>
          <div className='absolute top-1 right-1'>
            <Edit
              className='text-gray-500 cursor-pointer transition-transform hover:scale-95 active:scale-90'
              onClick={showEditForm}
              size={20}
            />
            <Trash2
              onClick={showDeleteConfirmation}
              size={20}
              className='text-gray-500 mt-3 cursor-pointer transition-transform hover:scale-95 active:scale-90'
            />
          </div>
        </>
      )}
      <DeleteConfirmation
        id={dataset.id}
        show={showDelete}
        hideShow={hideDeleteConfirmation}
        deleteItem={deleteDataset}
        updateStateAfterDelete={removeDatasetFromState}
        resourceType='dataset'
      />
    </>
  );
};

export default DatasetElement;
