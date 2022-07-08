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
      <div className='relative px-5 py-3 my-8 lg:my-14 lg:py-7 lg:px-5 border-b-2 mx-auto hover:bg-slate-200 active:bg-neutral-300 cursor-pointer group'>
        <div className='text-2xl lg:text-3xl text-slate-600 font-bold mx-auto'>{article.title}</div>
        <div className='w-3/5 mt-3 py-3 flex items-center flex-wrap gap-x-4'>
          {article.tags.map((tag) => (
            <ArticleTag tag={tag} key={tag.id} />
          ))}
        </div>
        <div className='absolute bottom-0 right-0 w-fit text-neutral-600 border-t border-l border-r border-neutral-300 text-sm p-1 group-hover:border-neutral-50 group-hover:bg-neutral-50'>
          {article.createdAt}
        </div>
      </div>
    </Link>
  );
};

export default ArticleLink;
