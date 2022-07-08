import { ReactElement } from "react";
import ITag from "../../interfaces/models/ITag";

const ArticleTag = ({ tag }: { tag: ITag }): ReactElement => {
  return (
    <div className='text-sm my-1 border rounded-md px-2 py-1 text-neutral-600 bg-slate-200 group-hover:border-neutral-50 group-hover:bg-neutral-50'>
      {tag.name}
    </div>
  );
};

export default ArticleTag;
