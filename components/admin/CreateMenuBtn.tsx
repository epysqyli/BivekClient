import { AxiosResponse } from "axios";
import { ReactElement } from "react";

interface Props {
  text: string;
  isArticleValid: boolean;
  handleClick?: () => Promise<AxiosResponse | void> | void;
  icon: ReactElement;
}

const CreateMenuBtn = ({ text, isArticleValid, handleClick, icon }: Props): ReactElement => {
  if (isArticleValid)
    return (
      <div
        onClick={handleClick}
        className='text-center py-2 mx-auto rounded cursor-pointer hover:scale-95 active:scale-75 transition-transform'
      >
        <div>{icon}</div>
        <span className="text-slate-600 dark:text-slate-200">{text}</span>
      </div>
    );

  return (
    <div className='text-center py-2 mx-auto rounded text-slate-200 dark:text-slate-600'>
      <div>{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default CreateMenuBtn;
