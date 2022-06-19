import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  text: string;
  href: string;
  icon: ReactElement;
}

const IndexLink = ({ text, href, icon }: Props): ReactElement => {
  return (
    <Link href={href}>
      <div className='flex justify-between items-center my-6 rounded shadow shadow-slate-300 bg-white transition-colors hover:bg-slate-500 cursor-pointer group'>
        <div className='flex items-center self-stretch px-4 bg-slate-400 rounded-tl rounded-bl'>{icon}</div>
        <div className='text-lg text-gray-800 group-hover:text-white w-4/5 text-center py-5'>{text}</div>
      </div>
    </Link>
  );
};

export default IndexLink;
