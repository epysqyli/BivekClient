import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement, useContext } from "react";
import type IArticle from "../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getArticleById } from "../../lib/ArticleRepo";
import GuestLayout from "../../layouts/GuestLayout";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import ArticleLink from "../../components/guest/ArticleLink";
import { getFurtherReading } from "../../lib/ArticleMethods";
import { AlignCenter, MoreHorizontal } from "react-feather";
import Head from "next/head";
import { DarkModeContext } from "../../hooks/DarkModeContext";

interface Props {
  article: IArticle;
  body: string;
  similarArticles: Array<IArticle>;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = Number(context.query.id);
  const articleResp: AxiosResponse<IArticle> = await getArticleById(id);
  let body: string = generateHTML(JSON.parse(articleResp.data.body), [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"]
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Image
  ]);
  body = body.replaceAll("<p></p>", "<br />");

  const similarArticles = await getFurtherReading(
    articleResp.data.tags.map((t) => t.id),
    articleResp.data.id
  );
  return { props: { article: articleResp.data, body: body, similarArticles: similarArticles } };
};

const Article: NextPageLayout<Props> = ({ article, body, similarArticles }: Props): ReactElement => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <AlignCenter size={40} strokeWidth={1.5} className='w-min mx-auto text-amber-700' />
      <h1 className='text-4xl font-semibold text-slate-700 dark:text-slate-100 text-center mt-8 mb-10'>
        {article.title}
      </h1>
      <h2 className='text-xl text-slate-600 dark:text-slate-400 text-center my-7'>{article.createdAt}</h2>
      <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 mx-auto'>
        <div className='ProseMirror pb-10'>
          <div dangerouslySetInnerHTML={{ __html: body }} className={isDarkMode() ? "dark" : "light"}></div>
        </div>
      </div>
      <div className='text-justify w-11/12 lg:w-2/3 mx-auto my-20'>
        <MoreHorizontal size={60} strokeWidth={1.5} className='w-min mx-auto mb-5 text-amber-700' />
        {similarArticles.map((article) => (
          <ArticleLink key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

Article.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Article;
