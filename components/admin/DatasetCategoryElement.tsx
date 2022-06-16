import { ReactElement, useState } from "react";
import type IDataCategory from "../../interfaces/models/IDataCategory";
import { deleteDataCategory } from "../../lib/DataCategoryRepo";
import DeleteConfirmation from "./DeleteConfirmation";
import { Trash } from "react-feather";
import DatasetElement from "./DatasetElement";

interface Props {
  dataCategory: IDataCategory;
  updateStateAfterDelete: (id: number) => void;
}

const DatasetCategoryElement = ({ dataCategory, updateStateAfterDelete }: Props): ReactElement => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const showDeleteConfirmation = () => setShowDelete(true);
  const hideDeleteConfirmation = () => setShowDelete(false);

  return (
    <>
      <div className='flex items-center justify-between w-5/6 mx-auto'>
        <h3 className='my-5 text-center text-xl font-bold'>{dataCategory.name}</h3>
        <Trash onClick={showDeleteConfirmation} className="text-slate-700" />
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
        {dataCategory.datasets !== null && dataCategory.datasets.length !== 0 ? (
          dataCategory.datasets.map((dataset) => {
            return (
              <div className='w-5/6 border mx-auto px-2 py-2' key={dataset.id}>
                <DatasetElement dataset={dataset} />
              </div>
            );
          })
        ) : (
          <div className='w-5/6 border mx-auto px-2 py-2 text-center'>This category is still empty</div>
        )}
      </div>
    </>
  );
};

export default DatasetCategoryElement;
