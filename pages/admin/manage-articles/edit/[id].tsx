import type NextPageLayout from "../../../../types/NextPageLayout";
import type { Article, ArticlePatch } from "../../../../interfaces/IArticle";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosResponse } from "axios";
import type { JSONContent } from "@tiptap/react";
import type { FormEvent } from "react";
import type { ReactElement } from "react";
import type { Tag } from "../../../../interfaces/IArticle";
import AssignTags from "../../../../components/Admin/AssignTags";
import { getTags } from "../../../../lib/TagRepo";
import AdminLayout from "../../../../layouts/AdminLayout";
import { getArticleById, hideArticle, patchArticle, publishArticle } from "../../../../lib/ArticleRepo";
import { checkLogin } from "../../../../lib/Auth";
import { useState } from "react";
import TipTap from "../../../../components/TipTap/TipTap";
import { generateHTML, generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import { isArticleValid } from "../../../../lib/ArticleEditMethods";
import CreateMenuBtn from "../../../../components/Admin/CreateMenuBtn";
import TopElement from "../../../../components/Admin/TopElement";

export const getServerSideProps: GetServerSideProps = async (
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

  const resp: AxiosResponse<Article> = await getArticleById(Number(context.query.id));
  const article: Article = resp.data;
  const body: string = generateHTML(JSON.parse(article.body), [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"]
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Image
  ]);

  article.body = body;
  const tags = await getTags();

  return { props: { article: article, tags: tags.data } };
};

interface Props {
  article: Article;
  tags: Array<Tag>;
}

const EditArticle: NextPageLayout<Props> = ({ article, tags }: Props): ReactElement => {
  const [titlePatch, setTitlePatch] = useState<ArticlePatch>({
    path: "title",
    op: "replace",
    value: article.title
  });
  const [bodyPatch, setBodyPatch] = useState<ArticlePatch>({
    path: "body",
    op: "replace",
    value: JSON.stringify(
      generateJSON(article.body, [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"]
        }),
        Table.configure({
          resizable: true
        }),
        TableRow,
        TableHeader,
        TableCell,
        Image
      ])
    )
  });

  const [allTags] = useState<Array<Tag>>(tags);
  const [currentTags, setCurrentTags] = useState<Array<Tag>>(article.tags);
  const [showTagsMenu, setTagsMenu] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(article.published);

  const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
    setTitlePatch({ ...titlePatch, value: e.currentTarget.value.trim() });
  };
  const updateBody = (content: JSONContent) => setBodyPatch({ ...bodyPatch, value: JSON.stringify(content) });

  const handlePatchArticle = async (): Promise<void> => {
    await patchArticle(article.id, [titlePatch, bodyPatch]);
  };

  const toggleAssignTags = (): void => (showTagsMenu ? setTagsMenu(false) : setTagsMenu(true));
  const handleToggle = (): void => toggleAssignTags();

  const togglePublishStatus = async (): Promise<void> => {
    if (isPublished) {
      const resp: AxiosResponse<Article> = await hideArticle(article.id);
      setIsPublished(resp.data.published);
    } else {
      const resp: AxiosResponse<Article> = await publishArticle(article.id);
      setIsPublished(resp.data.published);
    }
  };

  return (
    <>
      <TopElement text='Edit article' />
      <div className='block w-5/6 mx-auto'>
        <input
          onChange={handleTitleChange}
          defaultValue={article.title}
          type='text'
          name='title'
          id='title'
          placeholder='title required'
          className='border-b border-gray-600 focus:border-slate-400 mx-auto text-center text-lg block w-full py-1 px-2 mb-2 focus:outline-none'
        />
      </div>
      <div className='w-11/12 mx-auto rounded'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} existingContent={article.body} />
        </div>
      </div>

      <CreateMenuBtn
        text='Assign tags'
        isArticleValid={isArticleValid(titlePatch.value, bodyPatch.value)}
        handleClick={handleToggle}
      />

      <div>
        {showTagsMenu ? (
          <AssignTags
            allTags={allTags}
            currentTags={currentTags}
            setCurrentTags={setCurrentTags}
            articleId={article.id}
          />
        ) : null}
      </div>

      <CreateMenuBtn
        text='Save changes'
        isArticleValid={isArticleValid(titlePatch.value, bodyPatch.value)}
        handleClick={handlePatchArticle}
      />

      {isPublished ? (
        <CreateMenuBtn
          text='Hide article'
          isArticleValid={isArticleValid(titlePatch.value, bodyPatch.value)}
          handleClick={togglePublishStatus}
        />
      ) : (
        <CreateMenuBtn
          text='Publish article'
          isArticleValid={isArticleValid(titlePatch.value, bodyPatch.value)}
          handleClick={togglePublishStatus}
        />
      )}
    </>
  );
};

EditArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default EditArticle;