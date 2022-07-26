import { FormEvent, ReactElement, useContext } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import { createTag, deleteTag, getTags } from "../../lib/TagRepo";
import ITag from "../../interfaces/models/ITag";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import TopElement from "../../components/admin/TopElement";
import { PlusCircle } from "react-feather";
import DeleteConfirmation from "../../components/admin/DeleteConfirmation";
import { OverlayContext } from "../../hooks/OverlayContext";
import TagItem from "../../components/admin/TagItem";
import type IValidationError from "../../interfaces/IValidationError";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{} | Redirect> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{} | Redirect>> => {
  const isLogged: boolean = await checkLogin(context);
  if (isLogged === false) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    };
  }

  const tags: AxiosResponse<Array<ITag>> = await getTags();

  return { props: { tags: tags.data } };
};

interface TagsProps {
  tags: Array<ITag>;
}

const ArticleTags: NextPageLayout<TagsProps> = ({ tags }: TagsProps): ReactElement => {
  const [currentTags, setCurrentTags] = useState<Array<ITag>>(tags);
  const [clickedTagId, setClickedTagId] = useState<number>(0);
  const [newTag, setNewTag] = useState<string>("");
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [creationError, setCreationError] = useState<string>("");
  const { showOverlay, hideOverlay } = useContext(OverlayContext);

  const showDeleteConfirmation = () => {
    setShowDelete(true);
    showOverlay();
  };

  const hideDeleteConfirmation = () => {
    setShowDelete(false);
    hideOverlay();
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => setNewTag(e.currentTarget.value);

  const handleCreateTag = async (): Promise<void> => {
    if (newTag.length >= 3) {
      try {
        const newlyAddedTagResp = await createTag(newTag);
        const newlyAddedTag = newlyAddedTagResp.data;
        setCurrentTags([...currentTags, newlyAddedTag]);
        setCreationError("");
        setNewTag("");
      } catch (error) {
        const errorWrapper = error as AxiosError;
        const errorData = errorWrapper.response!.data as IValidationError;
        setCreationError(errorData.errors.Name![0]);
      }
    }
  };

  const handleDeleteTag = async (id: number): Promise<void> => {
    setCurrentTags(currentTags.filter((t) => t.id !== id));
  };

  const baseInputStyle = "block w-4/5 mx-auto py-2 pl-3 border-b-2 text-center focus:outline-none";
  const successInputStyle = baseInputStyle + " border-gray-300";
  const errorInputStyle = baseInputStyle + " text-red-600 bg-red-100 border-red-400 animate-pulse";

  return (
    <>
      <Head>
        <title>Manage Tags</title>
      </Head>
      <div className='mx-auto w-11/12 md:w-4/6 lg:w-3/5 xl:w-1/2'>
        <TopElement text='Manage tags' />
        <div className='flex items-end text-lg w-5/6 mx-auto rounded-md mt-10 mb-16'>
          <div onClick={handleCreateTag} className='w-min mx-auto cursor-pointer group'>
            <PlusCircle
              size={42}
              strokeWidth={1.25}
              fill='gray'
              color='white'
              className='border-gray-400 border-2 rounded-full group-hover:scale-95 group-active:scale-75 transition-transform'
            />
          </div>
          <input
            onChange={handleChange}
            type='text'
            aria-label='input-tag-name'
            value={newTag}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateTag();
            }}
            className={creationError.length === 0 ? successInputStyle : errorInputStyle}
            placeholder='Enter tag name'
          />
        </div>
      </div>
      <div className='mx-auto w-5/6 md:w-1/2 lg:w-4/5 xl:w-3/5 2xl:w-1/2'>
        <div className='grid lg:grid-cols-3 gap-x-5 gap-y-4 lg:gap-y-3'>
          {currentTags
            .sort((a, b) => (a.id > b.id ? -1 : 1))
            .map((tag) => (
              <div
                key={tag.id}
                className='pl-2 shadow-sm bg-white shadow-slate-400 rounded-md flex items-center justify-between'
              >
                <TagItem
                  tag={tag}
                  showDeleteConfirmation={showDeleteConfirmation}
                  setClickedTagId={setClickedTagId}
                />
              </div>
            ))}
        </div>
        <DeleteConfirmation
          id={clickedTagId}
          show={showDelete}
          resourceType='tag'
          deleteItem={deleteTag}
          hideShow={hideDeleteConfirmation}
          updateStateAfterDelete={handleDeleteTag}
        />
      </div>
    </>
  );
};

ArticleTags.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ArticleTags;
