import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import GuestLayout from "../layouts/GuestLayout";
import IndexLink from "../components/guest/IndexLink";
import { Database, Info, Paperclip, Type } from "react-feather";
import SectionHeader from "../components/SectionHeader";

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const Home: NextPageLayout = (): ReactElement => {
  return (
    <>
      <div className='lg:my-10'>
        <SectionHeader resource='homepage' text='Blog title' />
      </div>
      <nav className='py-5 bg-slate-500 text-slate-50 lg:text-xl'>
        <div className='flex items-center justify-around flex-wrap mx-auto gap-x-2 w-11/12 lg:w-2/3'>
          <IndexLink
            pageLink='/articles'
            item='articles'
            icon={<Type size={32} className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
          <IndexLink
            pageLink='/datasets'
            item='datasets'
            icon={<Database size={32} className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
          <IndexLink
            pageLink='/research-papers'
            item='papers'
            icon={
              <Paperclip size={32} className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />
            }
          />
          <IndexLink
            pageLink='/about'
            item='About'
            icon={<Info size={32} className='text-slate-100 group-active:text-slate-500 w-min mx-auto' />}
          />
        </div>
      </nav>
      <div className='text-center rounded border my-5 py-20'>
        <p>latest resources</p>
        <p>latest resources</p>
        <p>latest resources</p>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Home;
