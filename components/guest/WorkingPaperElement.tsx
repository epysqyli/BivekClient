import Link from "next/link";
import { ReactElement } from "react";
import { Download } from "react-feather";
import IWorkingPaper from "../../interfaces/models/IWorkingPaper";

interface Props {
  workingPaper: IWorkingPaper;
}

const WorkingPaperElement = ({ workingPaper }: Props): ReactElement => {
  return (
    <div className='my-10 py-6 px-2 w-5/6 mx-auto border-b-2 hover:bg-slate-200 active:bg-slate-300'>
      <h2 className='text-2xl text-center mb-8 font-medium text-slate-700'>{workingPaper.title}</h2>
      <div className='text-slate-700 w-5/6 mx-auto text-justify'>{workingPaper.abstract}</div>
      <Link href={workingPaper.link}>
        <Download
          size={30}
          strokeWidth={1.5}
          className='w-fit mx-auto mt-6 text-slate-600 cursor-pointer transition-transform hover:scale-95 active:scale-90'
        />
      </Link>
    </div>
  );
};

export default WorkingPaperElement;
