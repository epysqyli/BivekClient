import { ReactElement } from "react";
import { Trash } from "react-feather";
import ITag from "../../interfaces/models/ITag";

interface Props {
  tag: ITag;
  showDeleteConfirmation(): void;
  setClickedTagId(id: number): void;
}

const TagItem = ({ tag, showDeleteConfirmation, setClickedTagId }: Props): ReactElement => {
  const handleClick = () => {
    showDeleteConfirmation();
    setClickedTagId(tag.id);
  };

  return (
    <>
      <div className='py-4 pl-3 text-lg text-gray-700 dark:text-slate-50'>{tag.name}</div>
      <div
        onClick={handleClick}
        className='flex items-center self-stretch px-5 bg-slate-100 dark:bg-slate-400 transition-colors rounded-br rounded-tr cursor-pointer group'
      >
        <Trash
          size={24}
          role='button'
          aria-label='show-delete-tag-button'
          className='text-slate-500 dark:text-slate-100 group-hover:text-red-500 group-active:text-slate-900'
        />
      </div>
    </>
  );
};

export default TagItem;
