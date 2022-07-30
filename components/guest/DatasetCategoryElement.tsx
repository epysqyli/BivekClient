import { ReactElement } from "react";
import { Droplet } from "react-feather";
import IDataCategory from "../../interfaces/models/IDataCategory";
import DatasetElement from "./DatasetElement";

interface Props {
  datasetCategory: IDataCategory;
}

const DatasetCategoryElement = ({ datasetCategory }: Props): ReactElement => {
  return (
    <div className='my-10 py-5 px-2 mx-auto'>
      <h2 className="text-3xl tracking-tighter text-center mb-12 font-medium text-slate-700">{datasetCategory.name}</h2>
      <div>
        {datasetCategory.datasets.map((dataset) => (
          <DatasetElement dataset={dataset} key={dataset.id} />
        ))}
      </div>
    </div>
  );
};

export default DatasetCategoryElement;
