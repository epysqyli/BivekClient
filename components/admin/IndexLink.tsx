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
      <div className='py-7 border bg-slate-50 shadow-md shadow-slate-300 rounded-md hover:border-slate-50 hover:bg-slate-500 cursor-pointer hover:scale-105 transition-all group'>
        <div className="mb-2">{icon}</div>
        <div className='text-lg tracking-tight text-slate-800 group-hover:text-white text-center w-full'>{text}</div>
      </div>
    </Link>
  );
};

export default IndexLink;
