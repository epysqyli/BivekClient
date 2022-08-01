import Link from "next/link";
import { ReactElement } from "react";
import { Download } from "react-feather";
import IDataset from "../../interfaces/models/IDataset";

interface Props {
  dataset: IDataset;
}

const DatasetElement = ({ dataset }: Props): ReactElement => {
  return (
    <Link href={dataset.link}>
      <div className='mx-auto px-2 py-3 flex justify-between border-b dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 dark:active:bg-slate-700 active:bg-slate-400 hover:rounded cursor-pointer'>
        <div className='w-4/5 text-slate-700 dark:text-slate-100'>{dataset.title}</div>
        <Download className='w-1/5 text-amber-600 transition-transform hover:scale-95 active:scale-90' />
      </div>
    </Link>
  );
};

export default DatasetElement;
