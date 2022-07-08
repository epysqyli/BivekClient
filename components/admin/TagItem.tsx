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
      <div className='py-4 pl-3 text-lg text-gray-700'>{tag.name}</div>
      <div
        onClick={handleClick}
        className='flex items-center self-stretch px-5 bg-slate-100 transition-colors rounded-br rounded-tr cursor-pointer group'
      >
        <Trash size={24} className='text-slate-500 group-hover:text-red-500 group-active:text-slate-900' />
      </div>
    </>
  );
};

export default TagItem;
