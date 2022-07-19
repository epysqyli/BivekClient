import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";
import SectionHeader from "../components/SectionHeader";

const About: NextPageLayout = (): ReactElement => {
  return (
    <>
      <SectionHeader resource='about' text='About' />
      <div className='w-11/12 lg:w-2/3 mx-auto mt-10'></div>
    </>
  );
};

About.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default About;
