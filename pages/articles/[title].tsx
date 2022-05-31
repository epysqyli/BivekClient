import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { ReactElement } from "react";
import type { Article } from "../../interfaces/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getArticleById } from "../../lib/ArticleRepo";
import Layout from "../../layouts/Layout";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

interface Props {
  article: Article;
  body: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = Number(context.query.id);
  const resp: AxiosResponse<Article> = await getArticleById(id);
  let body: string = generateHTML(JSON.parse(resp.data.body), [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"]
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell
  ]);
  body = body.replaceAll("<p></p>", "<br />");

  return { props: { article: resp.data, body: body } };
};

const Article: NextPageLayout<Props> = ({ article, body }: Props): ReactElement => {
  return (
    <>
      <h1 className='text-2xl text-center my-5'>{article.title}</h1>
      <div className='w-11/12 md:w-4/5 lg:w-1/2 mx-auto'>
        <div className='ProseMirror' dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
    </>
  );
};

Article.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Article;
