import type { ReactElement } from "react";
import type { FormEvent } from "react";
import type IPatch from "../../interfaces/models/IPatch";
import { useState } from "react";
import IDataset from "../../interfaces/models/IDataset";
import { patchDataset } from "../../lib/DatasetRepo";

interface Props {
  currentDataset: IDataset;
  hideForm(): void;
  replaceDatasetsInState(dataset: IDataset): void;
}

const DatasetEditForm = ({ currentDataset, replaceDatasetsInState, hideForm }: Props): ReactElement => {
  const [dataset, setDataset] = useState<IDataset>({
    id: currentDataset.id,
    title: currentDataset.title,
    link: currentDataset.link,
    dataCategoryId: currentDataset.dataCategoryId
  });

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const titlePatch: IPatch = { path: "title", op: "replace", value: dataset.title };
    const linkPatch: IPatch = { path: "link", op: "replace", value: dataset.link };
    const editedDatasetResp = await patchDataset(dataset.id, [titlePatch, linkPatch]);
    if (editedDatasetResp.status === 201) {
      replaceDatasetsInState(editedDatasetResp.data);
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
            placeholder='new name'
            className='block mt-2 w-full border-b border-gray-400 p-2 outline-none focus:shadow-md text-sm'
            defaultValue={dataset.title}
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
            className='block mt-2 w-full border-b border-gray-400 p-2 outline-none focus:shadow-md text-sm'
            defaultValue={dataset.link}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type='submit'
          className='block mx-auto w-fit rounded-md bg-white mt-5 mb-2 hover:shadow-md'
        >
          Confirm changes
        </button>
      </form>
      <div
        onClick={hideForm}
        className='text-sm text-center mx-auto text-gray-400 mb-2 hover:underline cursor-pointer'
      >
        or keep old values
      </div>
    </>
  );
};

export default DatasetEditForm;
