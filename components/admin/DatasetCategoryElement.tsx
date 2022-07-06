import { ReactElement, useContext, useState } from "react";
import type IDataCategory from "../../interfaces/models/IDataCategory";
import { deleteDataCategory } from "../../lib/DataCategoryRepo";
import DeleteConfirmation from "./DeleteConfirmation";
import { PlusCircle, Trash } from "react-feather";
import DatasetElement from "./DatasetElement";
import IDataset from "../../interfaces/models/IDataset";
import { OverlayContext } from "../../hooks/OverlayContext";
import DatasetForm from "./DatasetForm";

interface Props {
  dataCategory: IDataCategory;
  updateStateAfterDelete: (id: number) => void;
}

const DatasetCategoryElement = ({ dataCategory, updateStateAfterDelete }: Props): ReactElement => {
  const [datasets, setDatasets] = useState<Array<IDataset>>(dataCategory.datasets || []);
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

  const [showDatasetCreateForm, setShowDatasetCreateForm] = useState<boolean>(false);
  const showCreateForm = () => setShowDatasetCreateForm(true);
  const hideCreateForm = () => setShowDatasetCreateForm(false);

  const addDatasetToState = (dataset: IDataset) => setDatasets([...datasets, dataset]);
  const removeDatasetFromState = (id: number) => setDatasets([...datasets.filter((d) => d.id !== id)]);
  const replaceDatasetsInState = (dataset: IDataset) => {
    const oldDatasets: Array<IDataset> = datasets.filter((d) => d.id !== dataset.id);
    const newDatasets: Array<IDataset> = [...oldDatasets, dataset].sort((a, b) => (a.id > b.id ? 1 : -1));
    setDatasets(newDatasets);
  };

  return (
    <div className='relative'>
      <div className='w-5/6 mx-auto'>
        <h3 className='my-5 text-2xl font-bold text-gray-700'>{dataCategory.name}</h3>
      </div>

      <Trash
        size={36}
        onClick={showDeleteConfirmation}
        strokeWidth={1.75}
        role='button'
        aria-label='show-delete-category-button'
        className='bg-slate-300 hover:bg-amber-700 text-white rounded-full p-2 absolute -top-5 right-2 cursor-pointer transition-transform hover:scale-95 active:scale-90'
      />

      <DeleteConfirmation
        show={showDelete}
        hideShow={hideDeleteConfirmation}
        id={dataCategory.id}
        resourceType='dataset category'
        deleteItem={deleteDataCategory}
        updateStateAfterDelete={updateStateAfterDelete}
      />
      <div className='my-5'>
        {datasets !== null && datasets.length !== 0 ? (
          datasets
            .sort((a, b) => (a.id > b.id ? -1 : 1))
            .map((dataset) => {
              return (
                <div
                  className='w-11/12 relative border-b mx-auto my-5 px-2 py-2 hover:bg-slate-50'
                  key={dataset.id}
                >
                  <DatasetElement
                    dataset={dataset}
                    removeDatasetFromState={removeDatasetFromState}
                    replaceDatasetsInState={replaceDatasetsInState}
                  />
                </div>
              );
            })
        ) : (
          <div className='w-4/6 mx-auto text-sm text-gray-600 my-10 text-center'>
            click below to add the first dataset for this category
          </div>
        )}
      </div>
      {showDatasetCreateForm ? (
        <DatasetForm
          dataCategoryId={dataCategory.id}
          hideForm={hideCreateForm}
          addDatasetToState={addDatasetToState}
        />
      ) : (
        <PlusCircle
          onClick={showCreateForm}
          size={34}
          strokeWidth={1.25}
          className='w-min mx-auto mt-10 mb-5 text-white bg-slate-500 rounded-full cursor-pointer transition-transform hover:scale-95 active:scale-90'
        />
      )}
    </div>
  );
};

export default DatasetCategoryElement;
