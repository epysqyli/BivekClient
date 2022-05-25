import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layout/Layout";

const Home: NextPageLayout = (): ReactElement => {
  return <div className="text-center mt-10">Home page</div>;
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
