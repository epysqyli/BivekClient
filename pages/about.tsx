import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";
import SectionHeader from "../components/SectionHeader";
import Head from "next/head";

const About: NextPageLayout = (): ReactElement => {
  return (
    <div classname="lg:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto">
      <Head>
        <title>About</title>
      </Head>
      <SectionHeader resource='about' text='About' />
      <div className='mt-10'></div>
    </div>
  );
};

About.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default About;
