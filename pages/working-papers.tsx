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

const WorkingPapers: NextPageLayout<Props> = ({ workingPapers }: Props): ReactElement => {
  return (
    <>
      {workingPapers.map((wp) => (
        <WorkingPaperElement workingPaper={wp} key={wp.id} />
      ))}
    </>
  );
};

WorkingPapers.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default WorkingPapers;
