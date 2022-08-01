import Link from "next/link";
import { ReactElement } from "react";
import { Download } from "react-feather";
import IWorkingPaper from "../../interfaces/models/IWorkingPaper";

interface Props {
  workingPaper: IWorkingPaper;
}

const WorkingPaperElement = ({ workingPaper }: Props): ReactElement => {
  return (
    <div className='my-10 py-6 px-2 mx-auto border-b border-slate-400'>
      <h2 className='text-3xl tracking-tighter text-center mb-5 font-medium text-slate-700 dark:text-slate-100'>
        {workingPaper.title}
      </h2>
      <div className='text-xl text-center mb-10 text-slate-600 dark:text-slate-400'>
        {workingPaper.createdAt}
      </div>
      <div className='text-slate-700 dark:text-slate-200 w-5/6 mx-auto text-justify'>
        {workingPaper.abstract}
      </div>
      <div className='my-12 w-5/6 mx-auto'>
        <Link href={workingPaper.link}>
          <a className='flex items-center justify-between cursor-pointer my-5 py-2 px-2 rounded text-slate-600 dark:text-slate-200 group hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-700'>
            <div>Download paper</div>
            <Download
              size={28}
              strokeWidth={1.5}
              className='transition-transform group-hover:scale-95 group-active:scale-90 text-amber-600'
            />
          </a>
        </Link>
        {workingPaper.datasetLink ? (
          <Link href={workingPaper.link}>
            <a className='flex items-center justify-between cursor-pointer my-5 py-2 px-2 rounded text-slate-600 dark:text-slate-200 group hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-700'>
              <div>Download dataset</div>
              <Download
                size={28}
                strokeWidth={1.5}
                className='transition-transform group-hover:scale-95 group-active:scale-90 text-amber-600'
              />
            </a>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default WorkingPaperElement;
