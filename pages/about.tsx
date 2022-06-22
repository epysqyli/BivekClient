import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";

const About: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

About.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default About;
