import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import type IArticle from "../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getPublishedArticles } from "../../lib/ArticleRepo";
import GuestLayout from "../../layouts/GuestLayout";
import ArticleLink from "../../components/guest/ArticleLink";
import SectionHeader from "../../components/SectionHeader";

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
    <>
      <SectionHeader resource='article' text='Articles' />
      <div className='w-11/12 lg:w-2/3 mx-auto mt-10'>
        {articles.map((article) => (
          <ArticleLink key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

Articles.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Articles;
