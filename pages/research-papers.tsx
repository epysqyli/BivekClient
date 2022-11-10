import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import type { AxiosResponse } from "axios";
import GuestLayout from "../layouts/GuestLayout";
import IWorkingPaper from "../interfaces/models/IWorkingPaper";
import { getWorkingPapers } from "../lib/WorkingPaperRepo";
import WorkingPaperElement from "../components/guest/WorkingPaperElement";
import SectionHeader from "../components/SectionHeader";
import Head from "next/head";

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
    <div className="lg:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto">
      <Head>
        <title>Research papers</title>
      </Head>
      <SectionHeader resource='research' text='Research papers' />
      <div className='mt-10'>
        {workingPapers.map((wp) => (
          <WorkingPaperElement workingPaper={wp} key={wp.id} />
        ))}
      </div>
    </div>
  );
};

ResearchPapers.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default ResearchPapers;
