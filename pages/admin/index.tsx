import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Redirect } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import IndexLink from "../../components/admin/IndexLink";
import { Database, Edit, Paperclip, Tag, PlusCircle } from "react-feather";
import SectionHeader from "../../components/SectionHeader";
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

  return { props: {} };
};

const AdminIndex: NextPageLayout = (): ReactElement => {
  const iconStyle: string =
    "text-slate-50 group-hover:scale-95 group-active:scale-90 transition-transform mx-auto";

  return (
    <>
      <Head>
        <title>Manage blog</title>
      </Head>
      <SectionHeader resource='admin' text='Manage blog resources' />
      <div className='my-20 mx-auto w-5/6 md:w-4/6 lg:w-2/5 xl:w-1/3'>
        <IndexLink
          text='Create a new article'
          href='/admin/create-new-article'
          icon={<PlusCircle size={32} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/edit-articles'
          text='Manage existing articles'
          icon={<Edit size={32} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-article-tags'
          text='Article tags'
          icon={<Tag size={32} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-datasets'
          text='Datasets'
          icon={<Database size={32} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-research-papers'
          text='Research papers'
          icon={<Paperclip size={32} strokeWidth={1.5} className={iconStyle} />}
        />
      </div>
    </>
  );
};

AdminIndex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminIndex;

// asdasdasd
