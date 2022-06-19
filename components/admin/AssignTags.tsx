import type { Dispatch, ReactElement, SetStateAction } from "react";
import type ITag from "../../interfaces/models/ITag";
import { addTag, removeTag } from "../../lib/TagsMethods";

interface Props {
  allTags: Array<ITag>;
  currentTags: Array<ITag>;
  setCurrentTags: Dispatch<SetStateAction<ITag[]>>;
  articleId: number;
}

const AssignTags = ({ allTags, currentTags, setCurrentTags, articleId }: Props): ReactElement => {
  const base = "p-2 m-1 rounded text-center bg-white cursor-pointer";
  const selected = base + " " + "bg-slate-600 text-white";

  const isAssigned = (tag: ITag): boolean => currentTags.map((t) => t.id).includes(tag.id);
  const styleClass = (tag: ITag): string => (isAssigned(tag) ? selected : base);

  const handleClick = (tag: ITag) => {
    if (isAssigned(tag)) {
      return removeTag(tag, currentTags, setCurrentTags, articleId);
    } else {
      return addTag(tag, currentTags, setCurrentTags, articleId);
    }
  };

  return (
    <div className='mx-auto flex items-start justify-center flex-wrap py-5 bg-slate-100'>
      {allTags.map((t) => (
        <div onClick={() => handleClick(t)} className={styleClass(t)} key={t.id}>
          {t.name}
        </div>
      ))}
    </div>
  );
};

export default AssignTags;
