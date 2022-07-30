import { NextRouter, useRouter } from "next/router";
import { ReactElement, MouseEvent } from "react";
import ITag from "../../interfaces/models/ITag";

const ArticleTag = ({ tag }: { tag: ITag }): ReactElement => {
  const router: NextRouter = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push({
      pathname: "/articles/tags/[tag]",
      query: { tag: tag.name, tagId: tag.id }
    });
  };

  return (
    <div
      className='text-sm text-center tracking-tight my-1 rounded-md px-3 py-2 border-2 border-amber-500 bg-slate-500 text-slate-50 hover:shadow-amber-500 hover:shadow hover:text-white active:bg-amber-500 cursor-pointer select-none'
      onClick={handleClick}
    >
      {tag.name}
    </div>
  );
};

export default ArticleTag;
