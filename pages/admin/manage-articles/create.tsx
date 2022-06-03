import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosResponse } from "axios";
import type { Article } from "../../../interfaces/IArticle";
import type { JSONContent } from "@tiptap/react";
import AdminLayout from "../../../layouts/AdminLayout";
import { checkLogin } from "../../../lib/Auth";
import { useState } from "react";
import { createArticle } from "../../../lib/ArticleRepo";
import TipTap from "../../../components/TipTap/TipTap";

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
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<JSONContent | undefined>(undefined);
  const updateBody = (content: JSONContent) => setBody(content);

  const handleChange = (e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value.trim());

  const createArticleWrapper = async (
    title: string,
    body: JSONContent | undefined,
    publish: boolean
  ): Promise<void> => {
    const resp: AxiosResponse<Article> = await createArticle(title, JSON.stringify(body), publish);
    console.log(resp.data.id);
  };

  return (
    <>
      <h1 className='text-2xl text-center my-10'>Create an article from scratch</h1>
      <div className='block w-5/6 mx-auto'>
        <label htmlFor='title'>Article title</label>
        <input
          onChange={handleChange}
          type='text'
          name='title'
          id='title'
          className='border mx-auto block w-full py-1 px-2'
        />
      </div>
      <div className='w-11/12 mx-auto rounded'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} />
        </div>
      </div>

      <div
        onClick={async () => await createArticleWrapper(title, body, true)}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Save for later
      </div>

      <div
        onClick={async () => await createArticleWrapper(title, body, false)}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        Publish article
      </div>
    </>
  );
};

CreateArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateArticle;
