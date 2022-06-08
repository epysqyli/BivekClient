import { ReactElement } from "react";

const TagElement = ({ tagName }: { tagName: string }): ReactElement => {
  return <div className="text-sm text-center py-1 px-2 my-1 border border-slate-400 rounded-md">{tagName}</div>;
};

export default TagElement;
