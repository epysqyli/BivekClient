import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { ReactElement } from "react";
import type IArticle from "../../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../../types/NextPageLayout";
import { getArticleByTagIds } from "../../../lib/ArticleRepo";
import GuestLayout from "../../../layouts/GuestLayout";
import ArticleLink from "../../../components/guest/ArticleLink";
import SectionHeader from "../../../components/SectionHeader";

interface ArticlePageProps {
  articles: Array<IArticle>;
  tagName: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const tagId: number = Number(context.query.tagId);
  const tagName: string = String(context.query.tag);
  const resp: AxiosResponse<Array<IArticle>> = await getArticleByTagIds([tagId]);
  const articles: Array<IArticle> = resp.data;

  return { props: { articles, tagName } };
};

const AllTagArticles: NextPageLayout<ArticlePageProps> = ({
  articles,
  tagName
}: ArticlePageProps): ReactElement => {
  return (
    <>
      <SectionHeader resource='tag' text={`Articles: ${tagName}`} />
      <div className='w-11/12 lg:w-2/3 mx-auto mt-10'>
        {articles.map((article) => (
          <ArticleLink key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

AllTagArticles.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default AllTagArticles;
