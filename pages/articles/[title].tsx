import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { ReactElement } from "react";
import type { Article } from "../../interfaces/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getArticleById } from "../../lib/ArticleRepo";
import Layout from "../../layouts/Layout";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  article: Article;
  body: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = Number(context.query.id);
  const resp: AxiosResponse<Article> = await getArticleById(id);
  let body: string = generateHTML(JSON.parse(resp.data.body), [StarterKit]);
  body = body.replaceAll("<p></p>", "<br />");

  return { props: { article: resp.data, body: body } };
};

const Article: NextPageLayout<Props> = ({ article, body }: Props): ReactElement => {
  return (
    <>
      <h1 className='text-2xl text-center my-5'>{article.title}</h1>
      <div className='text-justify w-4/5 mx-auto mt-10' dangerouslySetInnerHTML={{ __html: body }}></div>
    </>
  );
};

Article.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Article;
