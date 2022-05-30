import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { ReactElement } from "react";
import type { Article } from "../../interfaces/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getArticleById } from "../../lib/ArticleRepo";
import Layout from "../../layouts/Layout";

interface Props {
  article: Article;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = Number(context.query.id);
  const resp: AxiosResponse<Article> = await getArticleById(id);

  return { props: { article: resp.data } };
};

const Article: NextPageLayout<Props> = ({ article }: Props): ReactElement => {
  return <div className='text-justify w-4/5 mx-auto mt-10'>{article.body}</div>;
};

Article.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Article;
