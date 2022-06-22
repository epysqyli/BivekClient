import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  pageLink: string;
  item: string;
  icon: ReactElement;
}

const SidebarLink = ({ pageLink, item, icon }: Props): ReactElement => {
  return (
    <Link href={pageLink}>
      <div className='flex items-center justify-between my-1 py-3 px-5 border-b border-dashed border-slate-400 active:bg-slate-300'>
        {icon}
        <div className='text-right text-xl text-slate-700'>{item}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
