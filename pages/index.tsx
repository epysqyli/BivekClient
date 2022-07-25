import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import GuestLayout from "../layouts/GuestLayout";
import IndexLink from "../components/guest/IndexLink";
import { ChevronsLeft, ChevronsRight, Database, Info, Paperclip, Type } from "react-feather";
import SectionHeader from "../components/SectionHeader";
import LatestArticle from "../components/guest/LatestArticle";
import { getLatestArticle } from "../lib/ArticleRepo";
import IArticle from "../interfaces/models/IArticle";
import ArticleLink from "../components/guest/ArticleLink";
import Link from "next/link";
import ITag from "../interfaces/models/ITag";
import { getTags } from "../lib/TagRepo";
import ArticleTag from "../components/guest/ArticleTag";

export const getServerSideProps: GetServerSideProps = async () => {
  const latestArticleResp = await getLatestArticle();
  const tagsResp = await getTags();

  return { props: { latestArticle: latestArticleResp.data, tags: tagsResp.data } };
};

interface Props {
  latestArticle: IArticle;
  tags: Array<ITag>;
}

const Home: NextPageLayout<Props> = ({ latestArticle, tags }: Props): ReactElement => {
  return (
    <>
      <div className='lg:my-10'>
        <SectionHeader resource='homepage' text='Blog title' />
      </div>

      <nav className='py-3 bg-slate-500 text-slate-50 lg:text-xl'>
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

      <div className='my-16 md:w-5/6 mx-auto lg:w-2/3 xl:w-1/2 text-center'>
        {latestArticle !== null ? <LatestArticle article={latestArticle} ArticleLink={ArticleLink} /> : null}
      </div>

      <Link href='/articles'>
        <div className='my-20 lg:my-32 flex items-center justify-center md:justify-center gap-x-5 hover:gap-x-7 md:gap-x-10 md:hover:gap-x-12 lg:gap-x-16 lg:hover:gap-x-20 transition-all cursor-pointer mx-auto w-fit group'>
          <ChevronsLeft className='text-amber-700 group-hover:scale-125' />
          <span className='text-xl lg:text-2xl hover:underline hover:underline-offset-2 text-amber-900'>
            Check all the articles
          </span>
          <ChevronsRight className='text-amber-700 group-hover:scale-125' />
        </div>
      </Link>

      <div className='my-16 w-11/12 lg:w-3/5 mx-auto grid grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-2'>
        {tags.map((tag) => (
          <div className='w-fit mx-auto' key={tag.id}>
            <ArticleTag tag={tag} />
          </div>
        ))}
      </div>

      <div className='text-center text-xl w-11/12 md:w-5/6 lg:w-3/5 mx-auto rounded-md border border-slate-400 px-5 py-10 my-16'>
        <p className='text-slate-800'>
          Barbara had been waiting at the table for twenty minutes. it had been twenty long and excruciating
          minutes. David had promised that he would be on time today. He never was, but he had promised this
          one time. She had made him repeat the promise multiple times over the last week until she had believed
          his promise. Now she was paying the price.
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
