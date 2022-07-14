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
      <div className='flex items-center justify-between py-4 px-5 border-b border-dashed border-slate-400 lg:cursor-pointer lg:hover:bg-neutral-300 select-none group'>
        {icon}
        <div className='text-right text-xl lg:text-lg text-slate-700'>{item}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
