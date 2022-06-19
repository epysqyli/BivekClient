import { FormEvent, ReactElement, useContext } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import { createTag, deleteTag, getTags } from "../../lib/TagRepo";
import ITag from "../../interfaces/models/ITag";
import { AxiosResponse } from "axios";
import { useState } from "react";
import TopElement from "../../components/admin/TopElement";
import { Trash, PlusCircle } from "react-feather";
import DeleteConfirmation from "../../components/admin/DeleteConfirmation";
import { OverlayContext } from "../../hooks/OverlayContext";

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
  const { showOverlay, hideOverlay } = useContext(OverlayContext);
  const [currentTags, setCurrentTags] = useState<Array<ITag>>(tags);
  const [clickedTagId, setClickedTagId] = useState<number>(0);
  const [newTag, setNewTag] = useState<string>("");
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const showDeleteConfimation = () => {
    setShowDelete(true);
    showOverlay();
  };

  const hideDeleteConfirmation = () => {
    setShowDelete(false);
    hideOverlay();
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => setNewTag(e.currentTarget.value.trim());

  const handleCreateTag = async (): Promise<void> => {
    if (newTag.length >= 3) {
      const newlyAddedTagResp = await createTag(newTag);
      const newlyAddedTag = newlyAddedTagResp.data;
      setCurrentTags([...currentTags, newlyAddedTag]);
      setNewTag("");
    }
  };

  const handleDeleteTag = async (id: number): Promise<void> => {
    setCurrentTags(currentTags.filter((t) => t.id !== id));
  };

  return (
    <>
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
          value={newTag}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateTag();
          }}
          className='border-b-2 border-gray-300 block w-4/5 mx-auto py-2 pl-3 text-center focus:outline-none'
          placeholder='Enter tag name'
        />
      </div>

      <div>
        {currentTags.map((tag) => (
          <div
            className='w-4/5 mx-auto my-4 pl-2 shadow-sm bg-white shadow-slate-500 rounded-md flex items-center justify-between'
            key={tag.id}
          >
            <div className='py-4 pl-3 text-lg text-gray-700'>{tag.name}</div>
            <div
              onClick={() => {
                showDeleteConfimation(), setClickedTagId(tag.id);
              }}
              className='flex items-center self-stretch px-5 bg-slate-100 transition-colors rounded-br rounded-tr cursor-pointer group'
            >
              <Trash
                size={24}
                className='text-slate-500 group-hover:text-red-500 group-active:text-slate-900'
              />
            </div>
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
    </>
  );
};

ArticleTags.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ArticleTags;
