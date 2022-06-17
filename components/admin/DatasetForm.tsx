import type { ReactElement } from "react";
import type { FormEvent } from "react";
import { useState } from "react";
import IDataCategory from "../../interfaces/models/IDataCategory";
import IDataset from "../../interfaces/models/IDataset";
import { createDataset } from "../../lib/DatasetRepo";

interface Props {
  dataCategory: IDataCategory;
  hideForm(): void;
  addDatasetToState(dataset: IDataset): void;
}

const DatasetForm = ({ dataCategory, addDatasetToState, hideForm }: Props): ReactElement => {
  const [dataset, setDataset] = useState<IDataset>({
    title: "",
    link: "",
    dataCategoryId: dataCategory.id
  });

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const newDatasetResp = await createDataset(dataset);
    if (newDatasetResp.status === 201) {
      addDatasetToState(newDatasetResp.data);
      hideForm();
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setDataset({ ...dataset, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='w-5/6 mx-auto'>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='name for the new dataset'
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            required
          />
        </div>

        <div className='w-5/6 mx-auto my-4'>
          <input
            type='text'
            name='link'
            id='link'
            placeholder='download link'
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            required
          />
        </div>

        <button
          type='submit'
          className='block mx-auto w-fit border px-3 py-2 rounded-md bg-white mt-10 mb-5 hover:shadow-md'
        >
          Add dataset to category
        </button>
      </form>
      <div
        onClick={hideForm}
        className='text-sm text-center mx-auto text-gray-400 mb-4 hover:underline cursor-pointer'
      >
        or close form
      </div>
    </>
  );
};

export default DatasetForm;
