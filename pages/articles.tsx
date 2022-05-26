import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import type { Article } from "../interfaces/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../types/NextPageLayout";
import { getArticles } from "../lib/ArticleRepo";
import Layout from "../layouts/Layout";

interface ArticlePageProps {
  articles: Array<Article>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<Article>> = await getArticles();
  const articles: Array<Article> = resp.data;

  return { props: { articles } };
};

const Articles: NextPageLayout<ArticlePageProps> = ({ articles }: ArticlePageProps): ReactElement => {
  return (
    <div className='text-justify w-4/5 mx-auto mt-10'>
      {articles.map((a) => (
        <p key={a.id}>{a.title}</p>
      ))}
    </div>
  );
};

Articles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Articles;
