import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../../types/NextPageLayout";
import AdminLayout from "../../../layouts/AdminLayout";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import React, { useState } from "react";
import { checkLogin } from "../../../lib/Auth";

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

const ConvertArticle: NextPageLayout = (): ReactElement => {
  const [file, setFile] = useState<File>();
  const [isUploaded, setIsUploaded] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [res, setRes] = useState<string>("");

  const handleFileUpload = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files !== null) {
      setFile(e.currentTarget.files[0]);
      setIsUploaded(true);
    }
  };

  if (isUploaded === false && isConverted === false)
    return (
      <>
        <h1 className='text-center text-2xl my-10'>Time for a new article!</h1>
        <form className='w-5/6 mx-auto'>
          <label htmlFor='docx-article' className='text-center py-3 border-2 border-black rounded block'>
            Upload a .docx file
          </label>
          <input
            type='file'
            name='docx-article'
            id='docx-article'
            className='hidden'
            onChange={handleFileUpload}
          />
        </form>
      </>
    );

  if (isUploaded === true && isConverted === false)
    return (
      <>
        <h1 className='text-center text-2xl my-10'>Convert now!</h1>
        <div
          // onClick={handleConversion}
          className='w-min mx-auto px-10 py-2 text-white bg-slate-700 rounded-md shadow-lg shadow-slate-200'
        >
          GO
        </div>
      </>
    );

  return (
    <>
      <form>
        <div className='w-5/6 mx-auto my-4'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='username'
            id='title'
            className='block mt-2 w-full border border-gray-600 p-3 focus:ring-0 rounded-lg shadow-sm focus:shadow-md'
            required
          />
        </div>

        <button
          type='submit'
          className='block mx-auto rounded w-3/6 border p-5 bg-white my-10 hover:shadow-md focus:bg-gray-200 focus:shadow-md'
        >
          Create article
        </button>
      </form>
    </>
  );
};

ConvertArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ConvertArticle;
