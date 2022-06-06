import type NextPageLayout from "../../../../types/NextPageLayout";
import type { Article, ArticlePatch } from "../../../../interfaces/IArticle";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosResponse } from "axios";
import type { JSONContent } from "@tiptap/react";
import type { FormEvent } from "react";
import type { ReactElement } from "react";
import type { Tag } from "../../../../interfaces/IArticle";
import { createArticleTagRelation, deleteArticleTag } from "../../../../lib/ArticleTagRepo";
import AssignTags from "../../../../components/Admin/AssignTags";
import { getTags } from "../../../../lib/TagRepo";
import AdminLayout from "../../../../layouts/AdminLayout";
import { getArticleById, patchArticle } from "../../../../lib/ArticleRepo";
import { checkLogin } from "../../../../lib/Auth";
import { useState } from "react";
import TipTap from "../../../../components/TipTap/TipTap";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";

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
  const [titlePatch, setTitlePatch] = useState<ArticlePatch>({ path: "title", op: "replace", value: "" });
  const [bodyPatch, setBodyPatch] = useState<ArticlePatch>({
    path: "body",
    op: "replace",
    value: article.body
  });

  const [allTags] = useState<Array<Tag>>(tags);
  const [currentTags, setCurrentTags] = useState<Array<Tag>>(article.tags);
  const [showTagsMenu, setTagsMenu] = useState<boolean>(false);

  const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
    setTitlePatch({ ...titlePatch, value: e.currentTarget.value.trim() });
  };
  const updateBody = (content: JSONContent) => setBodyPatch({ ...bodyPatch, value: JSON.stringify(content) });

  const handlePatchArticle = async (): Promise<AxiosResponse> => {
    return await patchArticle(article.id, [titlePatch, bodyPatch]);
  };

  const toggleAssignTags = (): void => (showTagsMenu ? setTagsMenu(false) : setTagsMenu(true));
  const handleToggle = (): void => toggleAssignTags();

  return (
    <>
      <h1 className='text-2xl text-center my-10'>Edit article</h1>
      <div className='block w-5/6 mx-auto'>
        <label htmlFor='title'>Article title</label>
        <input
          onChange={handleTitleChange}
          defaultValue={article.title}
          type='text'
          name='title'
          id='title'
          className='border mx-auto block w-full py-1 px-2'
        />
      </div>
      <div className='w-11/12 mx-auto rounded'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} existingContent={article.body} />
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
            articleId={article.id}
          />
        ) : null}
      </div>

      <div
        onClick={handlePatchArticle}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Save changes
      </div>
    </>
  );
};

EditArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default EditArticle;
