import Link from "next/link";
import { ReactElement } from "react";

const SidebarLink = ({ pageLink, item }: { pageLink: string; item: string }): ReactElement => {
  return (
    <Link href={pageLink}>
      <div className='text-right text-xl my-1 py-3 px-5 text-slate-700 border-b border-dashed border-slate-400 active:bg-slate-300'>
        {item}
      </div>
    </Link>
  );
};

export default SidebarLink;
