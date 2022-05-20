import type { ReactElement } from "react";
import type NextPageWithLayout from "../types/NextPageWithLayout";
import Layout from "../layout/Layout";

const Home: NextPageWithLayout = (): ReactElement => {
  return <div className="bg-gray-200">Index with layout</div>;
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
