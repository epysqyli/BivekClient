import { ReactElement } from "react";

const TopElement = ({ text }: { text: string }): ReactElement => {
  return <h1 className='py-10 mb-10 text-center text-3xl border-b-2'>{text}</h1>;
};

export default TopElement;
