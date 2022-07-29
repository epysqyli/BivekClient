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
      <div className='border-2 border-amber-500 bg-slate-500 shadow-md shadow-slate-300 hover:shadow-slate-400 rounded-md hover:border-amber-700 cursor-pointer transition-all group flex items-center justify-between px-10 py-6'>
        <div>{icon}</div>
        <div className='text-lg tracking-tight text-slate-50 group-hover:text-white text-right'>
          {text}
        </div>
      </div>
    </Link>
  );
};

export default IndexLink;
