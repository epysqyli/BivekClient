import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import GuestLayout from "../layouts/GuestLayout";
import IndexLink from "../components/guest/IndexLink";
import { Database, Info, Paperclip, Type } from "react-feather";
import SectionHeader from "../components/SectionHeader";
import LatestArticle from "../components/guest/LatestArticle";
import { getLatestArticle } from "../lib/ArticleRepo";
import IArticle from "../interfaces/models/IArticle";
import ArticleLink from "../components/guest/ArticleLink";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const latestArticleResp = await getLatestArticle();

  return { props: { latestArticle: latestArticleResp.data } };
};

interface Props {
  latestArticle: IArticle;
}

const Home: NextPageLayout<Props> = ({ latestArticle }: Props): ReactElement => {
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
      <div className='my-16 md:w-5/6 mx-auto lg:w-2/3 xl:w-1/2'>
        <LatestArticle article={latestArticle} ArticleLink={ArticleLink} />
      </div>
      <div className='text-center text-xl w-11/12 md:w-5/6 lg:w-3/5 mx-auto border rounded-md border-slate-300 px-5 py-10'>
        <p className='text-slate-800'>
          Welcome to my blog! Where I write about this and that because I like writing about this and that.
          Enjoy the stay
        </p>
        <Link href='/about'>
          <span className='cursor-pointer mt-10 block underline underline-offset-2 text-slate-600 hover:text-slate-800 active:text-slate-300'>
            Find more about me
          </span>
        </Link>
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Home;
