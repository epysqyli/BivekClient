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
import Head from "next/head";

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
  const iconStyle =
    "text-slate-100 w-min mx-auto mt-1 group-hover:scale-95 transition-all group-active:scale-90 group-active:text-amber-500";

  return (
    <div className="mx-auto lg:w-2/3 xl:w-1/2">
      <Head>
        <title>SocratesCoachella</title>
        <meta name='description' content='Personal blog' />
        <link rel='icon' href='#' />
      </Head>
      <div className='lg:my-10'>
        <SectionHeader resource='homepage' text='SocratesCoachella' />
      </div>

      <nav className='py-3 my-5 lg:my-16 lg:text-xl'>
        <div className='flex items-center justify-around flex-wrap mx-auto md:gap-y-10 md:gap-x-5 md:w-11/12 xl:w-4/5'>
          <IndexLink pageLink='/articles' item='articles' icon={<Type size={32} className={iconStyle} />} />
          <IndexLink
            pageLink='/datasets'
            item='datasets'
            icon={<Database size={32} className={iconStyle} />}
          />
          <IndexLink
            pageLink='/research-papers'
            item='papers'
            icon={<Paperclip size={32} className={iconStyle} />}
          />
          <IndexLink pageLink='/about' item='about' icon={<Info size={32} className={iconStyle} />} />
        </div>
      </nav>

      <div className='my-20 text-center'>
        {latestArticle !== null ? <LatestArticle article={latestArticle} ArticleLink={ArticleLink} /> : null}
      </div>

      <Link href='/articles'>
        <div className='my-32 flex items-center justify-center md:justify-center gap-x-5 hover:gap-x-7 md:gap-x-10 md:hover:gap-x-12 lg:gap-x-16 lg:hover:gap-x-20 transition-all cursor-pointer mx-auto w-fit group'>
          <ChevronsLeft className='text-amber-700 group-hover:scale-125' />
          <span className='text-2xl hover:underline hover:underline-offset-2 text-amber-900 dark:text-amber-500'>
            Explore all articles
          </span>
          <ChevronsRight className='text-amber-700 group-hover:scale-125' />
        </div>
      </Link>

      <div className='w-11/12 mx-auto my-16 flex flex-wrap'>
        {tags.map((tag) => (
          <div className='w-fit mx-auto' key={tag.id}>
            <ArticleTag tag={tag} />
          </div>
        ))}
      </div>

      <div className='w-11/12 md:w-full xl:w-2/3 mx-auto text-center text-xl rounded bg-neutral-50 dark:bg-slate-600 px-5 py-10 my-16'>
        <p className='text-slate-800 dark:text-slate-50'>
          .
        </p>
        <Link href='/about'>
          <span className='cursor-pointer mt-10 block underline underline-offset-2 text-slate-600 dark:text-white hover:text-slate-800 dark:hover:text-slate-200 dark:active:text-slate-300 active:text-slate-300'>
            Find more about me
          </span>
        </Link>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Home;
