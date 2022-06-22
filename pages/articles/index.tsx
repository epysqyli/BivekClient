import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import type IArticle from "../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getPublishedArticles } from "../../lib/ArticleRepo";
import slugify from "slugify";
import GuestLayout from "../../layouts/GuestLayout";
import Link from "next/link";

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
    <div className='text-justify w-4/5 mx-auto mt-10'>
      {articles.map((a) => (
        <Link
          href={{
            pathname: "/articles/[title]",
            query: {
              title: slugify(a.title, { lower: true }),
              id: a.id
            }
          }}
          key={a.id}
        >
          <p>{a.title}</p>
        </Link>
      ))}
    </div>
  );
};

Articles.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Articles;
