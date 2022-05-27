import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import AdminLayout from "../../layouts/AdminLayout";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import { checkLogin } from "../../lib/Auth";

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

  return { props: {} };
};

const ManageArticles: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

ManageArticles.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageArticles;
