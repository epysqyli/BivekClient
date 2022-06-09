import { AxiosResponse } from "axios";
import { ReactElement } from "react";

interface Props {
  text: string;
  isArticleValid: boolean;
  handleClick?: () => Promise<AxiosResponse | void> | void;
}

const CreateMenuBtn = ({ text, isArticleValid, handleClick }: Props): ReactElement => {
  if (isArticleValid)
    return (
      <div
        onClick={handleClick}
        className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100'
      >
        {text}
      </div>
    );

  return (
    <div className='text-center w-2/5 my-5 py-2 border mx-auto rounded cursor-pointer bg-slate-100 text-slate-200'>
      {text}
    </div>
  );
};

export default CreateMenuBtn;
