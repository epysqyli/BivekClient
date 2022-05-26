import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import Layout from "../layouts/Layout";

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const Home: NextPageLayout = (): ReactElement => {
  return (
    <div className='text-justify w-4/5 mx-auto mt-10'>
      <h1 className='text-center mb-10'>home page</h1>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Home;
