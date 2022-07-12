import type { ReactElement } from "react";
import type { FormEvent } from "react";
import type IPatch from "../../interfaces/models/IPatch";
import type IDataset from "../../interfaces/models/IDataset";
import type IDatasetCreate from "../../interfaces/models/IDatasetCreate";
import { useState } from "react";
import { createDataset, patchDataset } from "../../lib/DatasetRepo";

interface Props {
  currentDataset?: IDataset;
  dataCategoryId: number;
  hideForm(): void;
  addDatasetToState?(dataset: IDataset): void;
  replaceDatasetsInState?(dataset: IDataset): void;
}

const DatasetForm = ({
  currentDataset,
  dataCategoryId,
  addDatasetToState,
  hideForm,
  replaceDatasetsInState
}: Props): ReactElement => {
  const [dataset, setDataset] = useState<IDatasetCreate>({
    title: currentDataset?.title ?? "",
    link: currentDataset?.link ?? "",
    dataCategoryId: dataCategoryId
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setDataset({ ...dataset, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleCreateDataset = async () => {
    const newDatasetResp = await createDataset(dataset);
    if (addDatasetToState) if (newDatasetResp.status === 201) addDatasetToState(newDatasetResp.data);
  };

  const handlePatchDataset = async () => {
    const titlePatch: IPatch = { path: "title", op: "replace", value: dataset.title };
    const linkPatch: IPatch = { path: "link", op: "replace", value: dataset.link };
    if (currentDataset && replaceDatasetsInState) {
      const editedDatasetResp = await patchDataset(currentDataset.id, [titlePatch, linkPatch]);
      if (editedDatasetResp.status === 201) replaceDatasetsInState(editedDatasetResp.data);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    currentDataset ? handlePatchDataset() : handleCreateDataset();
    hideForm();
  };

  return (
    <>
      <form aria-label='dataset-form' onSubmit={handleSubmit}>
        <div className='w-5/6 mx-auto'>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='name for the new dataset'
            aria-label="input-title"
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            defaultValue={currentDataset?.title}
            required
          />
        </div>

        <div className='w-5/6 mx-auto my-4'>
          <input
            type='text'
            name='link'
            id='link'
            placeholder='download link'
            aria-label="input-link"
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            defaultValue={currentDataset?.link}
            required
          />
        </div>

        <button
          type='submit'
          className='block mx-auto text-sm w-fit rounded-md p-2 bg-white mt-10 mb-5 hover:shadow-md active:shadow-inner'
        >
          {currentDataset ? "Confirm changes" : "Add dataset to category"}
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
