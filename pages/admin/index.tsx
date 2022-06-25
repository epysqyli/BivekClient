import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Redirect } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import TopElement from "../../components/admin/TopElement";
import IndexLink from "../../components/admin/IndexLink";
import { Database, Edit3, FilePlus, Paperclip, Tag, Server } from "react-feather";

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
  const iconStyle: string = "text-slate-600 group-hover:text-slate-50 group-hover:scale-95 group-active:scale-75 transition-transform";

  return (
    <>
      <TopElement text='Manage blog resources' />
      <div className='my-10 mx-auto w-5/6 md:w-4/6 lg:w-2/5 xl:w-1/3'>
        <IndexLink
          text='Create a new article'
          href='/admin/create-new-article'
          icon={<FilePlus size={30} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/edit-articles'
          text='Manage existing articles'
          icon={<Edit3 size={30} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/article-tags'
          text='Article tags'
          icon={<Tag size={30} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-datasets'
          text='Datasets'
          icon={<Database size={30} strokeWidth={1.5} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-working-papers'
          text='Working papers'
          icon={<Paperclip size={30} strokeWidth={1.5} className={iconStyle} />}
        />
      </div>
    </>
  );
};

AdminIndex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminIndex;
