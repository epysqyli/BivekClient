import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layouts/Layout";

const About: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

About.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default About;
