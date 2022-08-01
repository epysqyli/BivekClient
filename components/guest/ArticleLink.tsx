import { ReactElement } from "react";
import IArticle from "../../interfaces/models/IArticle";
import Link from "next/link";
import slugify from "slugify";
import ArticleTag from "./ArticleTag";

const ArticleLink = ({ article }: { article: IArticle }): ReactElement => {
  return (
    <Link
      href={{
        pathname: "/articles/[title]",
        query: {
          title: slugify(article.title, { lower: true }),
          id: article.id
        }
      }}
    >
      <div className='relative px-5 py-3 lg:py-7 lg:px-5 border-b-2 border-slate-300 mx-auto hover:bg-slate-300 dark:hover:bg-slate-600 dark:active:bg-slate-700 active:bg-slate-400 cursor-pointer group hover:rounded-tr hover:rounded-tl group'>
        <div className='text-3xl tracking-tighter text-left text-slate-600 dark:text-slate-200 font-bold mx-auto'>{article.title}</div>
        <div className='w-3/5 mt-3 py-5 flex items-center flex-wrap gap-x-4'>
          {article.tags.map((tag) => (
            <ArticleTag tag={tag} key={tag.id} />
          ))}
        </div>
        <div className='absolute bottom-0 right-0 w-fit text-slate-500 dark:text-slate-400 p-1 group-hover:border-neutral-50 group-hover:bg-neutral-50 dark:group-hover:text-slate-700 dark:group-hover:bg-slate-300 rounded-tl'>
          {article.createdAt}
        </div>
      </div>
    </Link>
  );
};

export default ArticleLink;
