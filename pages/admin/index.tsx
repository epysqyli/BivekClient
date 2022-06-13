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
  const iconStyle: string =
    "text-slate-500 group-hover:text-slate-600 group-active:text-slate-900 group-hover:scale-95 group-active:scale-75 transition-transform";

  return (
    <>
      <TopElement text='Manage blog resources' />
      <div className='my-10 w-4/5 mx-auto'>
        <IndexLink
          text='create a new article from scratch'
          href='/admin/create-new-article'
          icon={<FilePlus size={36} strokeWidth={1.25} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/edit-articles'
          text='edit or delete existing articles'
          icon={<Edit3 size={36} strokeWidth={1.25} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/article-tags'
          text='article tags'
          icon={<Tag size={36} strokeWidth={1.25} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-datasets'
          text='manage datasets'
          icon={<Database size={36} strokeWidth={1.25} className={iconStyle} />}
        />

        <IndexLink
          href='/admin/manage-working-papers'
          text='working papers'
          icon={<Paperclip size={36} strokeWidth={1.25} className={iconStyle} />}
        />
      </div>
    </>
  );
};

AdminIndex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default AdminIndex;
