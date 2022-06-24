import { ReactElement } from "react";
import IArticle from "../../interfaces/models/IArticle";
import Link from "next/link";
import slugify from "slugify";
import TagElement from "./TagElement";

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
      <div className='relative border-b px-3 py-3 my-5 lg:my-10 lg:py-7 lg:px-5 shadow shadow-slate-400 mx-auto rounded-md bg-neutral-50 hover:bg-slate-200 active:bg-neutral-300 cursor-pointer group'>
        <div className='text-2xl lg:text-3xl text-slate-700 font-bold'>{article.title}</div>
        <div className='w-3/5 mt-3 py-3 flex items-center flex-wrap gap-x-4'>
          {article.tags.map((tag) => (
            <TagElement tag={tag} key={tag.id} />
          ))}
        </div>
        <div className='absolute bottom-0 right-0 w-fit text-neutral-600 border-t border-l border-neutral-300 text-sm p-1 rounded-tl-md group-hover:border-neutral-50 group-hover:bg-neutral-50'>
          {article.createdAt}
        </div>
      </div>
    </Link>
  );
};

export default ArticleLink;
