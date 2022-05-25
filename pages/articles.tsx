import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layout/Layout";

const Articles: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

Articles.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Articles;