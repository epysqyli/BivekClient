import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Redirect } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import Link from "next/link";
import TopElement from "../../components/Admin/TopElement";

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

const AdminIndex: NextPageLayout = (): ReactElement => {
  return (
    <>
      <TopElement text='Manage blog resources' />
      <ul className='my-10 w-4/5 mx-auto list-disc'>
        <li>
          <Link href='/admin/create-new-article'>create a new article from scratch</Link>
        </li>
        <li>
          <Link href='/admin/edit-articles'>edit or delete existing articles</Link>
        </li>
        <li>
          <Link href='/admin/article-tags'>manage article tags</Link>
        </li>
        <li>
          <Link href='/admin/manage-datasets'>datasets and dataset categories</Link>
        </li>
        <li>
          <Link href='/admin/manage-working-papers'>working papers</Link>
        </li>
      </ul>
    </>
  );
};

AdminIndex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminIndex;
