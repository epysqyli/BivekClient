import type { ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import AdminLayout from "../../../layouts/AdminLayout";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import { checkLogin } from "../../../lib/Auth";
import TipTap from "../../../components/TipTap";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { createArticle } from "../../../lib/ArticleRepo";

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
  const [body, setBody] = useState<JSONContent>();
  const updateBody = (content: JSONContent) => setBody(content);

  return (
    <>
      <h1 className='text-2xl text-center my-10'>Create an article from scratch</h1>
      <div className='w-11/12 mx-auto rounded'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} />
        </div>
      </div>
      <div
        onClick={async () => await createArticle("Some image on the editor", JSON.stringify(body))}
        className='text-center w-2/5 my-10 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Create article
      </div>
    </>
  );
};

CreateArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateArticle;
