import { ReactElement, useState } from "react";
import type IDataCategory from "../../interfaces/models/IDataCategory";
import { deleteDataCategory } from "../../lib/DataCategoryRepo";
import DeleteConfirmation from "./DeleteConfirmation";
import { PlusCircle, Trash } from "react-feather";
import DatasetElement from "./DatasetElement";
import IDataset from "../../interfaces/models/IDataset";
import DatasetForm from "./DatasetForm";

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
    <>
      <div className='flex items-center justify-between w-5/6 mx-auto'>
        <h3 className='my-5 text-center text-xl font-bold'>{dataCategory.name}</h3>
        <Trash onClick={showDeleteConfirmation} className='text-slate-700' />
      </div>

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
              <div className='w-5/6 border rounded mx-auto my-1 px-2 py-2' key={dataset.id}>
                <DatasetElement dataset={dataset} />
              </div>
            );
          })
        ) : (
          <div className='w-5/6 border mx-auto px-2 py-2 text-center'>This category is still empty</div>
        )}
      </div>
      {showDatasetForm ? (
        <DatasetForm dataCategory={dataCategory} hideForm={hideForm} addDatasetToState={addDatasetToState} />
      ) : (
        <PlusCircle onClick={showForm} size={32} strokeWidth={1.5} className='w-min mx-auto my-10' />
      )}
    </>
  );
};

export default DatasetCategoryElement;
