import { ReactElement } from "react";

const TopElement = ({ text }: { text: string }): ReactElement => {
  return (
    <h1 className='w-5/6 mx-auto py-7 mt-2 mb-5 text-center text-4xl text-gray-700 font-bold'>{text}</h1>
  );
};

export default TopElement;
