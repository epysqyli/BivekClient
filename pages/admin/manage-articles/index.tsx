import type { ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import AdminLayout from "../../../layouts/AdminLayout";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import { checkLogin } from "../../../lib/Auth";
import Link from "next/link";

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
  return (
    <>
      <h1 className='text-2xl text-center my-10'>Manage articles</h1>
      <ul className='list-disc w-4/5 mx-auto my-10'>
        <li>
          <Link href='/admin/manage-articles/create'>create a new article</Link>
        </li>
        <li>
          <Link href='/admin/manage-articles/edit-or-delete'>edit or delete existing articles</Link>
        </li>
        <li>
          <Link href='/admin/manage-articles/tags'>manage article tags</Link>
        </li>
      </ul>
    </>
  );
};

ManageArticles.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageArticles;
