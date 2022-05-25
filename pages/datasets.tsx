import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layout/Layout";

const Datasets: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

Datasets.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Datasets;