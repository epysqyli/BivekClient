import type { Dispatch, ReactElement, SetStateAction } from "react";
import type { Tag } from "../../interfaces/IArticle";
import { addTag, removeTag } from "../../lib/TagsMethods";

interface Props {
  allTags: Array<Tag>;
  currentTags: Array<Tag>;
  setCurrentTags: Dispatch<SetStateAction<Tag[]>>;
  articleId: number;
}

const AssignTags = ({ allTags, currentTags, setCurrentTags, articleId }: Props): ReactElement => {
  const base = "border p-2 m-1 rounded text-center w-min";
  const selected = base + " " + "bg-slate-600 text-white";

  const isAssigned = (tag: Tag): boolean => currentTags.map((t) => t.id).includes(tag.id);
  const styleClass = (tag: Tag): string => (isAssigned(tag) ? selected : base);

  const handleClick = (tag: Tag) => {
    if (isAssigned(tag)) {
      return removeTag(tag, currentTags, setCurrentTags, articleId);
    } else {
      return addTag(tag, currentTags, setCurrentTags, articleId);
    }
  };

  return (
    <div className='w-5/6 mx-auto flex items-start justify-center flex-wrap border-t border-b py-5'>
      {allTags.map((t) => (
        <div onClick={() => handleClick(t)} className={styleClass(t)} key={t.id}>
          {t.name}
        </div>
      ))}
    </div>
  );
};

export default AssignTags;
