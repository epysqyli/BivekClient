import { ReactElement } from "react";
import { Tag } from "../../interfaces/IArticle";

interface Props {
  allTags: Array<Tag>;
  currentTags: Array<Tag>;
  addTag: (tag: Tag, currentTags: Array<Tag>) => void;
  removeTag: (tag: Tag, currentTags: Array<Tag>) => void;
}

const AssignTags = ({ allTags, currentTags, addTag, removeTag }: Props): ReactElement => {
  const base = "border p-2 m-1 rounded text-center w-min";
  const selected = base + " " + "bg-slate-600 text-white";

  const isAssigned = (tag: Tag): boolean => currentTags.map((t) => t.id).includes(tag.id);
  const styleClass = (tag: Tag): string => (isAssigned(tag) ? selected : base);

  const handleClick = (tag: Tag) => {
    isAssigned(tag) ? removeTag(tag, currentTags) : addTag(tag, currentTags);
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
