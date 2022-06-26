import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { ReactElement } from "react";
import type IArticle from "../../interfaces/models/IArticle";
import type { AxiosResponse } from "axios";
import type NextPageLayout from "../../types/NextPageLayout";
import { getArticleById, getArticleByTagIds } from "../../lib/ArticleRepo";
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

  const similarArticlesResp = await getArticleByTagIds(articleResp.data.tags.map((tag) => tag.id));
  const similarArticles = similarArticlesResp.data.filter((a) => a.id !== articleResp.data.id);
  return { props: { article: articleResp.data, body: body, similarArticles: similarArticles } };
};

const Article: NextPageLayout<Props> = ({ article, body, similarArticles }: Props): ReactElement => {
  return (
    <>
      <h1 className='text-4xl font-semibold text-gray-700 text-center mt-8 mb-10'>{article.title}</h1>
      <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 mx-auto'>
        <div className='ProseMirror pb-10' dangerouslySetInnerHTML={{ __html: body }}></div>
      </div>
      <div className='text-justify w-11/12 lg:w-2/3 mx-auto mt-20'>
        <h3 className="text-4xl text-center font-medium text-slate-700 mb-10 border-b pb-3">Correlated articles</h3>
        {similarArticles.map((article) => (
          <ArticleLink key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

Article.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Article;
