import { Edit } from "react-feather";
import { ReactElement } from "react";
import Link from "next/link";
import IArticle from "../../interfaces/models/IArticle";
import ArticleTag from "./ArticleTag";

interface Props {
  article: IArticle;
}

const EditArticleEntry = ({ article }: Props): ReactElement => {
  return (
    <div className='flex justify-between items-center border dark:border-none bg-white dark:bg-slate-500 shadow-sm shadow-slate-300 dark:shadow-none rounded pl-3'>
      <div className='py-2 xl:py-5'>
        <div className='mb-3 dark:text-white'>{article.title}</div>
        {article.published ? (
          <div className='text-sm mb-3 text-green-800 dark:text-green-300'>visible by readers</div>
        ) : (
          <div className='text-sm mb-3 text-amber-700 dark:text-amber-400'>hidden to readers</div>
        )}
        <div className='flex items-center flex-wrap gap-x-1'>
          {article.tags.map((t) => (
            <ArticleTag key={t.id} tagName={t.name} />
          ))}
        </div>
      </div>
      <Link href={`edit-articles/${article.id}`}>
        <div className='flex justify-center items-center self-stretch px-5 bg-slate-50 dark:bg-slate-400 hover:bg-slate-100 transition-colors rounded-br rounded-tr cursor-pointer group xl:w-1/3'>
          <Edit className='text-slate-500 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-200 group-active:text-slate-900 dark:group-active:text-slate-300 xl:scale-110' />
        </div>
      </Link>
    </div>
  );
};

export default EditArticleEntry;
