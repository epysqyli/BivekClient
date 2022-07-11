import type { ReactElement } from "react";
import type { FormEvent } from "react";
import type IWorkingPaperCreate from "../../interfaces/models/IWorkingPaperCreate";
import type IWorkingPaper from "../../interfaces/models/IWorkingPaper";
import type IPatch from "../../interfaces/models/IPatch";
import { createWorkingPaper, patchWorkingPaper } from "../../lib/WorkingPaperRepo";
import { useState } from "react";

interface Props {
  currentWorkingPaper?: IWorkingPaper;
  hideForm(): void;
  addWorkingPaperToState?(workingPaper: IWorkingPaper): void;
  replaceWorkingPapersInState?(workingPaper: IWorkingPaper): void;
}

const WorkingPaperForm = ({
  hideForm,
  addWorkingPaperToState,
  currentWorkingPaper,
  replaceWorkingPapersInState
}: Props): ReactElement => {
  const [newWorkingPaper, setNewWorkingPaper] = useState<IWorkingPaperCreate>({
    title: currentWorkingPaper?.title ?? "",
    abstract: currentWorkingPaper?.abstract ?? "",
    link: currentWorkingPaper?.link ?? "",
    datasetLink: currentWorkingPaper?.datasetLink ?? ""
  });

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewWorkingPaper({ ...newWorkingPaper, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleCreateWorkingPaper = async (): Promise<void> => {   
    const resp = await createWorkingPaper(newWorkingPaper);
    if (resp.status === 201) {
      if (addWorkingPaperToState !== undefined) addWorkingPaperToState(resp.data);
      hideForm();
    }
  };

  const handlePatchWorkingPaper = async (): Promise<void> => {
    const titlePatch: IPatch = { path: "title", op: "replace", value: newWorkingPaper.title };
    const abstractPatch: IPatch = { path: "abstract", op: "replace", value: newWorkingPaper.abstract };
    const linkPatch: IPatch = { path: "link", op: "replace", value: newWorkingPaper.link };
    const datasetLinkPatch: IPatch = {
      path: "datasetLink",
      op: "replace",
      value: newWorkingPaper.datasetLink ?? ""
    };

    if (currentWorkingPaper && replaceWorkingPapersInState) {
      const resp = await patchWorkingPaper(currentWorkingPaper?.id, [
        titlePatch,
        abstractPatch,
        linkPatch,
        datasetLinkPatch
      ]);
      replaceWorkingPapersInState(resp.data);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    currentWorkingPaper ? await handlePatchWorkingPaper() : await handleCreateWorkingPaper();
    hideForm();
  };

  return (
    <>
      <form aria-label='working-paper-form' onSubmit={handleSubmit}>
        <div className='w-5/6 mx-auto'>
          <input
            type='text'
            name='title'
            id='title'
            aria-label="input-title"
            placeholder='Working paper title'
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            defaultValue={currentWorkingPaper?.title}
            required
          />
        </div>

        <div className='w-5/6 mx-auto my-4'>
          <textarea
            name='abstract'
            id='abstract'
            aria-label="input-abstract"
            placeholder='abstract'
            rows={5}
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            defaultValue={currentWorkingPaper?.abstract}
            required
          />
        </div>

        <div className='w-5/6 mx-auto my-4'>
          <input
            type='text'
            name='link'
            id='link'
            aria-label="input-link"
            placeholder='download link'
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            defaultValue={currentWorkingPaper?.link}
            required
          />
        </div>
        <div className='w-5/6 mx-auto my-4'>
          <input
            type='text'
            name='datasetLink'
            id='datasetLink'
            aria-label="input-dataset-link"
            placeholder='dataset download link'
            className='block mt-2 w-full border-b border-gray-400 p-3 outline-none focus:shadow-md text-sm'
            onChange={handleChange}
            defaultValue={currentWorkingPaper?.datasetLink}
          />
        </div>
        <button
          type='submit'
          className='block mx-auto text-sm w-fit rounded-md p-2 bg-white mt-10 mb-5 hover:shadow-md active:shadow-inner'
        >
          {currentWorkingPaper ? "edit paper" : "create working paper"}
        </button>
      </form>
      <div
        onClick={hideForm}
        className='text-sm text-center w-fit mx-auto text-gray-400 mb-2 hover:underline cursor-pointer'
      >
        or close form
      </div>
    </>
  );
};

export default WorkingPaperForm;
