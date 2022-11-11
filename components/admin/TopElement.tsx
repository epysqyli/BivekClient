import { ReactElement } from "react";

const TopElement = ({ text }: { text: string }): ReactElement => {
  return (
    <h1 className='mx-auto pb-7 mt-2 mb-5 text-center text-4xl text-gray-700 dark:text-slate-100 font-bold'>{text}</h1>
  );
};

export default TopElement;
