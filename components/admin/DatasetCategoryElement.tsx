import { ReactElement, useState } from "react";
import type IDataCategory from "../../interfaces/models/IDataCategory";
import { deleteDataCategory } from "../../lib/DataCategoryRepo";
import DeleteConfirmation from "./DeleteConfirmation";
import { PlusCircle, Trash } from "react-feather";
import DatasetElement from "./DatasetElement";
import IDataset from "../../interfaces/models/IDataset";
import DatasetCreateForm from "./DatasetCreateForm";

interface Props {
  dataCategory: IDataCategory;
  updateStateAfterDelete: (id: number) => void;
}

const DatasetCategoryElement = ({ dataCategory, updateStateAfterDelete }: Props): ReactElement => {
  const [datasets, setDatasets] = useState<Array<IDataset>>(dataCategory.datasets || []);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const showDeleteConfirmation = () => setShowDelete(true);
  const hideDeleteConfirmation = () => setShowDelete(false);

  const [showDatasetForm, setShowDatasetForm] = useState<boolean>(false);
  const showForm = () => setShowDatasetForm(true);
  const hideForm = () => setShowDatasetForm(false);

  const addDatasetToState = (dataset: IDataset) => setDatasets([...datasets, dataset]);
  const removeDatasetFromState = (dataset: IDataset) => {
    setDatasets([...datasets.filter((d) => d.id !== dataset.id)]);
  };

  return (
    <div className='relative'>
      <div className='w-5/6 mx-auto text-center'>
        <h3 className='my-5 text-2xl font-bold text-gray-700 w-4/5'>{dataCategory.name}</h3>
      </div>

      <Trash
        size={36}
        onClick={showDeleteConfirmation}
        strokeWidth={1.75}
        className='bg-slate-600 text-white rounded-full p-2 absolute -top-4 right-2 cursor-pointer transition-transform hover:scale-95 active:scale-90'
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
          datasets.map((dataset) => {
            return (
              <div className='w-5/6 border rounded mx-auto my-3 px-2' key={dataset.id}>
                <DatasetElement dataset={dataset} />
              </div>
            );
          })
        ) : (
          <div className='w-4/6 mx-auto text-sm text-gray-600 my-10 text-center'>
            click below to add the first dataset for this category
          </div>
        )}
      </div>
      {showDatasetForm ? (
        <DatasetCreateForm
          dataCategory={dataCategory}
          hideForm={hideForm}
          addDatasetToState={addDatasetToState}
        />
      ) : (
        <PlusCircle
          onClick={showForm}
          size={34}
          strokeWidth={1.25}
          className='w-min mx-auto my-10 cursor-pointer transition-transform hover:scale-95 active:scale-90'
        />
      )}
    </div>
  );
};

export default DatasetCategoryElement;
