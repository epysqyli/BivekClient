import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import type { AxiosResponse } from "axios";
import GuestLayout from "../layouts/GuestLayout";
import IWorkingPaper from "../interfaces/models/IWorkingPaper";
import { getWorkingPapers } from "../lib/WorkingPaperRepo";
import WorkingPaperElement from "../components/guest/WorkingPaperElement";
import SectionHeader from "../components/SectionHeader";

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
    <>
      <SectionHeader resource='research' text='Research papers' />
      <div className='w-11/12 lg:w-2/3 mx-auto mt-10'>
        {workingPapers.map((wp) => (
          <WorkingPaperElement workingPaper={wp} key={wp.id} />
        ))}
      </div>
    </>
  );
};

ResearchPapers.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default ResearchPapers;
