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
      <div className='py-2 w-1/5 cursor-pointer group text-slate-100 border-b-2 bg-slate-600 hover:text-amber-500 transition-colors shadow-md shadow-slate-400 dark:shadow-none hover:border-amber-500'>
        {icon}
        <span className='block text mt-2 lg:mt-4 text-center'>{item}</span>
      </div>
    </Link>
  );
};

export default IndexLink;
