import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layout/Layout";

const WokringPapers: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

WokringPapers.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default WokringPapers;