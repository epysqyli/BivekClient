import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import type IArticle from "../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getPublishedArticles } from "../../lib/ArticleRepo";
import GuestLayout from "../../layouts/GuestLayout";
import ArticleLink from "../../components/guest/ArticleLink";
import SectionHeader from "../../components/SectionHeader";
import Head from "next/head";

interface ArticlePageProps {
  articles: Array<IArticle>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<IArticle>> = await getPublishedArticles();
  const articles: Array<IArticle> = resp.data;

  return { props: { articles } };
};

const Articles: NextPageLayout<ArticlePageProps> = ({ articles }: ArticlePageProps): ReactElement => {
  return (
    <div className="lg:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto">
      <Head>
        <title>Articles</title>
      </Head>
      <SectionHeader resource='article' text='Articles' />
      <div className='mt-16'>
        {articles.map((article) => (
          <div key={article.id} className="my-16 lg:my-20">
            <ArticleLink article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

Articles.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Articles;
