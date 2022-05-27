import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Redirect } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
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

const AdminIndex: NextPageLayout = (): ReactElement => {
  return (
    <>
      <h1 className='text-xl text-center py-10 border-b underline underline-offset-4'>
        Manage blog resources
      </h1>
      <ul className='my-10 w-4/5 mx-auto list-disc'>
        <li>
          <Link href='/admin/manage-articles'>articles</Link>
        </li>
        <li>
          <Link href='/admin/manage-datasets'>datasets</Link>
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
