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
    <div className='flex justify-between items-center border bg-white shadow-sm shadow-slate-300 rounded pl-3'>
      <div className='py-2'>
        <div className='mb-3'>{article.title}</div>
        {article.published ? (
          <div className='text-sm mb-3 text-green-800'>currently visible by readers</div>
        ) : (
          <div className='text-sm mb-3 text-amber-700'>hidden to readers</div>
        )}
        <div className='flex items-center flex-wrap gap-x-1'>
          {article.tags.map((t) => (
            <ArticleTag key={t.id} tagName={t.name} />
          ))}
        </div>
      </div>
      <Link href={`edit-articles/${article.id}`}>
        <div className='flex items-center self-stretch px-5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-br rounded-tr cursor-pointer group'>
          <Edit className='text-slate-500 group-hover:text-slate-600 group-active:text-slate-900' />
        </div>
      </Link>
    </div>
  );
};

export default EditArticleEntry;
