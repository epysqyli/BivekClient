import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import type { Article } from "../../interfaces/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getArticles } from "../../lib/ArticleRepo";
import slugify from "slugify";
import Layout from "../../layouts/Layout";
import Link from "next/link";

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

Articles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Articles;
