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
        className='text-center py-2 mx-auto rounded cursor-pointer bg-slate-100 hover:scale-95 active:scale-75 transition-transform'
      >
        <div>{icon}</div>
        <span>{text}</span>
      </div>
    );

  return (
    <div className='text-center py-2 mx-auto rounded bg-slate-100 text-slate-200'>
      <div>{icon}</div>
      <span>{text}</span>
    </div>
  );
};

export default CreateMenuBtn;
