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
      <div className='text-lg border w-4/5 mx-auto text-center rounded-md mt-10 mb-16 py-2'>
        <input
          onChange={handleChange}
          type='text'
          className='border block mx-auto my-2 rounded p-2'
          placeholder='Enter tag name'
        />
        <div onClick={handleCreateTag} className='my-5 border w-3/4 mx-auto rounded-md py-2'>
          Create tag
        </div>
      </div>

      <div>
        {currentTags.map((tag) => (
          <div
            className='w-5/6 mx-auto my-3 p-2 border-2 rounded-md flex items-center justify-between'
            key={tag.id}
          >
            <div>{tag.name}</div>
            <div onClick={() => handleDeleteTag(tag.id)} className='text-sm'>
              delete
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

Tags.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Tags;
