import type { ReactElement } from "react";
import type IDataCategory from "../../interfaces/models/IDataCategory";
import DatasetElement from "./DatasetElement";

interface Props {
  dataCategory: IDataCategory;
}

const DatasetCategoryElement = ({ dataCategory }: Props): ReactElement => {
  return (
    <>
      <h3 className='my-5 text-center text-xl font-bold'>{dataCategory.name}</h3>
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
