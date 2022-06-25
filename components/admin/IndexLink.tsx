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
      <div className='flex justify-between items-center my-6 border-b-2 border-slate-300 hover:border-slate-50 transition-colors hover:bg-slate-500 cursor-pointer group'>
        <div className='flex items-center self-stretch px-4 rounded-tl rounded-bl'>{icon}</div>
        <div className='text-lg text-slate-800 group-hover:text-white text-center w-full py-5'>{text}</div>
      </div>
    </Link>
  );
};

export default IndexLink;
