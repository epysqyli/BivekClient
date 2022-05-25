import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import type { Article } from "../interfaces/IArticle";
import { AxiosResponse } from "axios";
import Layout from "../layout/Layout";
import { getArticles } from "../lib/ArticleRepo";

export const getServerSideProps: GetServerSideProps = async () => {
  const allResp: AxiosResponse<Array<Article>> = await getArticles();
  const articles: Array<Article> = allResp.data;
  return {
    props: { articles }
  };
};

const Home: NextPageLayout<{ articles: Array<Article> }> = ({
  articles
}: {
  articles: Array<Article>;
}): ReactElement => {
  return (
    <div className='text-justify w-4/5 mx-auto mt-10'>
      <h1 className='text-center mb-10'>home page</h1>
      {articles.map((a) => (
        <p key={a.id}>{a.title}</p>
      ))}
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
