import type { ReactElement } from "react";
import IDataset from "../../interfaces/models/IDataset";

interface Props {
  dataset: IDataset;
}

const DatasetElement = ({ dataset }: Props): ReactElement => {
  return (
    <>
      <div className='p-1'>
        <div className='text-gray-500 text-sm'>title</div>
        <div className='mt-1 text-sm'>{dataset.title}</div>
      </div>
      <div className='p-1'>
        <div className='text-gray-600 text-sm'>download link</div>
        <div className='mt-1 text-sm'>{dataset.link}</div>
      </div>
    </>
  );
};

export default DatasetElement;
