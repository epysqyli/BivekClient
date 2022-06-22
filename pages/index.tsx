import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import GuestLayout from "../layouts/GuestLayout";

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const Home: NextPageLayout = (): ReactElement => {
  return (
    <div>
      <div className='py-20 bg-slate-100 text-center'>logo/banner/image</div>
      <nav className='py-10 bg-zinc-400 text-slate-50 text-center'>articles - datasets - working papers</nav>
      <div className='text-center rounded border my-5 py-20'>
        <p>welcome info</p>
        <p>latest resources</p>
        <p>other stuff - link to linkedin for example</p>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Home;
