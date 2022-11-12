import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import type IArticle from "../../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import AdminLayout from "../../../layouts/AdminLayout";
import { checkLogin } from "../../../lib/Auth";
import { getArticles } from "../../../lib/ArticleRepo";
import EditArticleEntry from "../../../components/admin/EditArticleEntry";
import TopElement from "../../../components/admin/TopElement";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{} | Redirect> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{} | Redirect>> => {
  const isLogged: boolean = await checkLogin(context);
  if (isLogged === false) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    };
  }

  const articles: AxiosResponse<Array<IArticle>> = await getArticles(context);
  return { props: { articles: articles.data } };
};

interface Props {
  articles: Array<IArticle>;
}

const EditIndex: NextPageLayout<Props> = ({ articles }: Props): ReactElement => {
  return (
    <>
      <Head>
        <title>Manage existing articles</title>
      </Head>
      <div className="mt-10"><TopElement text='Manage your articles' /></div>
      <div className='mx-auto w-5/6 md:w-4/6 lg:w-3/5 xl:w-1/2 2xl:w-1/3 pb-10'>
        {articles.map((article) => (
          <div key={article.id} className='my-3 lg:my-5'>
            <EditArticleEntry article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

EditIndex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default EditIndex;
