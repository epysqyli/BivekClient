import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  pageLink: string;
  item: string;
  icon: ReactElement;
}

const IndexLink = ({ pageLink, item, icon }: Props): ReactElement => {
  return (
    <Link href={pageLink}>
      <div className='p-3 cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-slate-300 active:bg-slate-100 active:text-slate-500 transition-colors group'>
        {icon}
        <span className='block text mt-2 lg:mt-4'>{item}</span>
      </div>
    </Link>
  );
};

export default IndexLink;
