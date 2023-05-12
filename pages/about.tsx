import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";
import SectionHeader from "../components/SectionHeader";
import Head from "next/head";

const About: NextPageLayout = (): ReactElement => {
  return (
    <div className='lg:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto'>
      <Head>
        <title>About</title>
      </Head>
      <SectionHeader resource='about' text='About' />
      <div className='my-16 text-white mx-auto w-4/5 text-justify'>
        <p className="my-5">
          Hi y&lsquo;sall. I am Bivek. When I had the idea of writing a blog, the Chatgpt was not around. So, I
          thought it would be a good idea to write about things I am interested in and if the luck strikes,
          some people might even read it. I guess I now have to revise my forecast about the latter part.
        </p>

        <p className="my-5">
          Although portfolio constructions and present value analysis are my flat mates, I like to think that
          I might have a bit more room for couple of other things in my life. When I am not discussing how
          much efficiency is there in a certain market with my mates (Yes, you heard it right! The finance
          nerds do talk about these things even when they are in a bar), I like to read and discuss philosophy
          (particularly the branch of political philosophy), Physics (or more so science in general),
          everything Data, Mathematics etc. Besides that, I am a beginner night sky watcher (Beginner
          Astronomer sounds more fancy but that&lsquo;s too heavy title for me right now). Taking my telescope to
          the suburbs and watching the rings of Saturn is beyond satisfaction.
        </p>
        <p className="my-5">
          I am also a guitar player who has learned enough to noodle up and down the fretboard without making
          any progress musically for the last 10 years. I guess that&lsquo;s enough of an introduction for now. My
          goals with this blog is to try to improve my own understanding of the things I know and more
          importantly, things I like to know about. I often hear writing is a good way of expressing your own
          opinions and perspective to yourself.
        </p>
        <p className="my-5">Let&lsquo;s see if I am able to make the future me laugh.</p>
      </div>
    </div>
  );
};

About.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default About;
