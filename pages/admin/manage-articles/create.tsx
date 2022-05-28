import type { ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import AdminLayout from "../../../layouts/AdminLayout";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import { checkLogin } from "../../../lib/Auth";
import TipTap from "../../../components/TipTap";

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

const CreateArticle: NextPageLayout = (): ReactElement => {
  return (
    <>
      <h1 className='text-2xl text-center my-10'>Create an article from scratch</h1>
      <div className='w-5/6 mx-auto border-2 rounded'>
        <div className='mx-auto text-center border-b py-3'>This is the editor menu</div>
        <div className='px-5 py-2'>
          <TipTap />
        </div>
      </div>
    </>
  );
};

CreateArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateArticle;
