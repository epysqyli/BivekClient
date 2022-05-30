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
      <div className='w-5/6 mx-auto border-2 rounded'>
        <div className='mx-auto text-center border-b py-3'>This is the editor menu</div>
        <div className='px-5 py-2'>
          <TipTap updateBody={updateBody} />
        </div>
      </div>
      <div
        onClick={async () => await createArticle("New tiptap article", JSON.stringify(body))}
        className='text-center w-2/5 my-10 border mx-auto rounded cursor-pointer'
      >
        Create article
      </div>
    </>
  );
};

CreateArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateArticle;
