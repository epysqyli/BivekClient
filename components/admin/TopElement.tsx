import { ReactElement } from "react";

const TopElement = ({ text }: { text: string }): ReactElement => {
  return <h1 className='py-7 mb-10 text-center text-3xl text-gray-700 font-bold'>{text}</h1>;
};

export default TopElement;
