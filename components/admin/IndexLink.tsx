import Link from "next/link";
import { ReactElement, ReactNode } from "react";

interface Props {
  text: string;
  href: string;
  icon?: ReactElement;
}

const IndexLink = ({ text, href, icon }: Props): ReactElement => {
  return (
    <Link href={href}>
      <div className='flex justify-between items-center my-5  rounded shadow-sm shadow-slate-500 group cursor-pointer'>
        <div className='flex items-center self-stretch border-r-2 border-slate-300 px-3 bg-slate-50 rounded-tl rounded-bl '>
          {icon}
        </div>
        <div className='text-gray-800 w-3/5 py-5'>{text}</div>
      </div>
    </Link>
  );
};

export default IndexLink;
