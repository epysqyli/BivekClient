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
      className='text-sm my-1 border rounded-md px-2 py-1 text-neutral-600 bg-slate-200 group-hover:border-neutral-50 group-hover:bg-neutral-50'
      onClick={handleClick}
    >
      {tag.name}
    </div>
  );
};

export default ArticleTag;
