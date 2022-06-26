import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import type { AxiosResponse } from "axios";
import GuestLayout from "../layouts/GuestLayout";
import IWorkingPaper from "../interfaces/models/IWorkingPaper";
import { getWorkingPapers } from "../lib/WorkingPaperRepo";
import WorkingPaperElement from "../components/guest/WorkingPaperElement";

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<IWorkingPaper>> = await getWorkingPapers();
  const workingPapers: Array<IWorkingPaper> = resp.data;

  return { props: { workingPapers } };
};

interface Props {
  workingPapers: Array<IWorkingPaper>;
}

const ResearchPapers: NextPageLayout<Props> = ({ workingPapers }: Props): ReactElement => {
  return (
    <div className='md:w-5/6 lg:w-2/3 mx-auto'>
      {workingPapers.map((wp) => (
        <WorkingPaperElement workingPaper={wp} key={wp.id} />
      ))}
    </div>
  );
};

ResearchPapers.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default ResearchPapers;
