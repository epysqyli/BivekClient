import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosResponse } from "axios";
import type { Article } from "../../../interfaces/IArticle";
import type { JSONContent } from "@tiptap/react";
import type { Tag, ArticlePatch } from "../../../interfaces/IArticle";
import AdminLayout from "../../../layouts/AdminLayout";
import { checkLogin } from "../../../lib/Auth";
import { useState } from "react";
import { createArticle, patchArticle } from "../../../lib/ArticleRepo";
import { getTags } from "../../../lib/TagRepo";
import TipTap from "../../../components/TipTap/TipTap";
import AssignTags from "../../../components/Admin/AssignTags";

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

  const tags = await getTags();

  return { props: { tags: tags.data } };
};

interface PageProps {
  tags: Array<Tag>;
}

const CreateArticle: NextPageLayout<PageProps> = ({ tags }: PageProps): ReactElement => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [titlePatch, setTitlePatch] = useState<ArticlePatch>({ path: "title", op: "replace", value: "" });
  const [bodyPatch, setBodyPatch] = useState<ArticlePatch>({
    path: "body",
    op: "replace",
    value: ""
  });

  const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value.trim());
    setTitlePatch({ ...titlePatch, value: e.currentTarget.value.trim() });
  };

  const updateBody = (content: JSONContent) => {
    setBody(JSON.stringify(content));
    setBodyPatch({ ...bodyPatch, value: JSON.stringify(content) });
  };

  const [allTags] = useState<Array<Tag>>(tags);
  const [currentTags, setCurrentTags] = useState<Array<Tag>>([]);
  const [showTagsMenu, setTagsMenu] = useState<boolean>(false);

  const toggleAssignTags = (): void => (showTagsMenu ? setTagsMenu(false) : setTagsMenu(true));

  const handleToggle = async (): Promise<void> => {
    await handleCreateArticle(false);
    toggleAssignTags();
  };

  const handleCreateArticle = async (publish: boolean): Promise<void> => {
    if (id === 0) {
      const resp: AxiosResponse<Article> = await createArticle(title, body, publish);
      setId(resp.data.id);
    } else {
      await patchArticle(id, [titlePatch, bodyPatch]);
    }
  };

  return (
    <>
      <h1 className='text-2xl text-center my-10'>Create an article from scratch</h1>
      <div className='block w-5/6 mx-auto'>
        <label htmlFor='title'>Article title</label>
        <input
          onChange={handleTitleChange}
          type='text'
          name='title'
          id='title'
          className='border mx-auto block w-full py-1 px-2'
        />
      </div>
      <div className='w-11/12 mx-auto rounded'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} />
        </div>
      </div>

      <div
        onClick={handleToggle}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Assign tags
      </div>

      <div>
        {showTagsMenu ? (
          <AssignTags
            allTags={allTags}
            currentTags={currentTags}
            setCurrentTags={setCurrentTags}
            articleId={id}
          />
        ) : null}
      </div>

      <div
        onClick={async () => await handleCreateArticle(false)}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Save for later
      </div>

      <div
        onClick={async () => await handleCreateArticle(true)}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Publish immediately
      </div>
    </>
  );
};

CreateArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateArticle;
