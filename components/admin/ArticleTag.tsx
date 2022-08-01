import { ReactElement } from "react";

const ArticleTag = ({ tagName }: { tagName: string }): ReactElement => {
  return <div className="text-sm text-center py-1 px-2 my-1 bg-slate-500 dark:bg-slate-100 text-white dark:text-slate-700 rounded-md">{tagName}</div>;
};

export default ArticleTag;
