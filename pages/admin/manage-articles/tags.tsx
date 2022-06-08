import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import AdminLayout from "../../../layouts/AdminLayout";
import { checkLogin } from "../../../lib/Auth";
import { createTag, deleteTag, getTags } from "../../../lib/TagRepo";
import { Tag } from "../../../interfaces/IArticle";
import { AxiosResponse } from "axios";
import { useState } from "react";
import TopElement from "../../../components/Admin/TopElement";
import { Delete, PlusCircle } from "react-feather";

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

  const tags: AxiosResponse<Array<Tag>> = await getTags();

  return { props: { tags: tags.data } };
};

interface TagsProps {
  tags: Array<Tag>;
}

const Tags: NextPageLayout<TagsProps> = ({ tags }: TagsProps): ReactElement => {
  const [currentTags, setCurrentTags] = useState<Array<Tag>>(tags);
  const [newTag, setNewTag] = useState<string>("");

  const handleChange = (e: FormEvent<HTMLInputElement>) => setNewTag(e.currentTarget.value.trim());

  const handleCreateTag = async (): Promise<void> => {
    if (newTag.length >= 3) {
      const newlyAddedTagResp = await createTag(newTag);
      const newlyAddedTag = newlyAddedTagResp.data;
      setCurrentTags([...currentTags, newlyAddedTag]);
    }
  };

  const handleDeleteTag = async (id: number): Promise<void> => {
    const deleteResp: AxiosResponse = await deleteTag(id);
    if (deleteResp.status === 204) setCurrentTags(currentTags.filter((tag) => tag.id !== id));
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
          className='border-b-2 border-gray-300 block w-4/5 mx-auto py-2 pl-3 text-center focus:outline-none'
          placeholder='Enter tag name'
        />
      </div>

      <div>
        {currentTags.map((tag) => (
          <div
            className='w-5/6 mx-auto my-4 pl-2 shadow-sm shadow-slate-500 rounded-md flex items-center justify-between'
            key={tag.id}
          >
            <div className='py-3'>{tag.name}</div>
            <div
              onClick={() => handleDeleteTag(tag.id)}
              className='flex items-center self-stretch px-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-br rounded-tr cursor-pointer group'
            >
              <Delete className='text-slate-500 group-hover:text-slate-600 group-active:text-slate-900' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Tags.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Tags;
