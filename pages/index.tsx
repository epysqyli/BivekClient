import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import GuestLayout from "../layouts/GuestLayout";
import IndexLink from "../components/guest/IndexLink";
import { Database, Info, Paperclip, Type, Youtube } from "react-feather";

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const Home: NextPageLayout = (): ReactElement => {
  return (
    <div>
      <div className='py-20 bg-slate-100 text-center'>logo/banner/image</div>
      <nav className='py-10 bg-slate-500 text-slate-50 text-center'>
        <div className='flex items-center justify-around flex-wrap mx-auto gap-x-2 w-11/12'>
          <IndexLink
            pageLink='/articles'
            item='articles'
            icon={<Type className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
          <IndexLink
            pageLink='/datasets'
            item='datasets'
            icon={<Database className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
          <IndexLink
            pageLink='/working-papers'
            item='papers'
            icon={<Paperclip className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
          <IndexLink
            pageLink='/podcast-episodes'
            item='podcast'
            icon={<Youtube className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
        </div>
      </nav>
      <div className='text-center rounded border my-5 py-20'>
        <p>welcome info</p>
        <p>latest resources</p>
        <p>other stuff - link to social networks? (footer)</p>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Home;
