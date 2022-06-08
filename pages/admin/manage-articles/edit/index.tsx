import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { ReactElement } from "react";
import type NextPageLayout from "../../../../types/NextPageLayout";
import type { Article } from "../../../../interfaces/IArticle";
import type { AxiosResponse } from "axios";
import AdminLayout from "../../../../layouts/AdminLayout";
import { checkLogin } from "../../../../lib/Auth";
import { getArticles } from "../../../../lib/ArticleRepo";
import EditArticleEntry from "../../../../components/Admin/EditArticleEntry";
import TopElement from "../../../../components/Admin/TopElement";

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

  const articles: AxiosResponse<Array<Article>> = await getArticles();
  return { props: { articles: articles.data } };
};

interface Props {
  articles: Array<Article>;
}

const EditIndex: NextPageLayout<Props> = ({ articles }: Props): ReactElement => {
  return (
    <>
      <TopElement text='Manage your articles' />
      <div className="w-5/6 mx-auto">
        {articles.map((article) => (
          <div key={article.id}>
            <EditArticleEntry article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

EditIndex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default EditIndex;
