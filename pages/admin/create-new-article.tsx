import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosResponse } from "axios";
import type { Article } from "../../interfaces/IArticle";
import type { JSONContent } from "@tiptap/react";
import type { Tag, ArticlePatch } from "../../interfaces/IArticle";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import { useState } from "react";
import { createArticle, patchArticle } from "../../lib/ArticleRepo";
import { getTags } from "../../lib/TagRepo";
import TipTap from "../../components/tiptap/TipTap";
import AssignTags from "../../components/admin/AssignTags";
import CreateMenuBtn from "../../components/admin/CreateMenuBtn";
import { isArticleValid } from "../../lib/ArticleEditMethods";
import TopElement from "../../components/admin/TopElement";
import { Eye, Save, Tag as TagIcon } from "react-feather";

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

const CreateNewArticle: NextPageLayout<PageProps> = ({ tags }: PageProps): ReactElement => {
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
      <TopElement text='Create an article from scratch' />
      <div className='block w-5/6 mx-auto'>
        <input
          onChange={handleTitleChange}
          type='text'
          name='title'
          id='title'
          placeholder='Article title'
          className='border-b border-gray-600 focus:border-slate-400 mx-auto text-center text-lg block w-full py-1 px-2 mb-2 focus:outline-none'
        />
      </div>
      <div className='w-11/12 mx-auto rounded'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} />
        </div>
      </div>

      <div className='mt-10 py-2 flex bg-slate-100'>
        <CreateMenuBtn
          text='tags'
          isArticleValid={isArticleValid(title, body)}
          handleClick={handleToggle}
          icon={<TagIcon size={26} className='w-min mx-auto my-2 text-slate-600' />}
        />

        <CreateMenuBtn
          text='save for later'
          isArticleValid={isArticleValid(title, body)}
          handleClick={() => handleCreateArticle(false)}
          icon={<Save size={26} className='w-min mx-auto my-2 text-slate-600' />}
        />
        <CreateMenuBtn
          text='publish'
          isArticleValid={isArticleValid(title, body)}
          handleClick={() => handleCreateArticle(true)}
          icon={<Eye size={26} className='w-min mx-auto my-2 text-slate-600' />}
        />
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
    </>
  );
};

CreateNewArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateNewArticle;
