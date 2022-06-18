import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layouts/Layout";

const WorkingPapers: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

WorkingPapers.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default WorkingPapers;
