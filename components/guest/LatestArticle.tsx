import { ReactElement, ComponentType } from "react";
import { Activity } from "react-feather";
import IArticle from "../../interfaces/models/IArticle";

interface ArticleLinkProps {
  article: IArticle;
}

interface Props extends ArticleLinkProps {
  ArticleLink: ComponentType<ArticleLinkProps>;
}

const LatestArticle = ({ ArticleLink, article }: Props): ReactElement => {
  return (
    <>
      <div className='flex items-center justify-around md:justify-center md:gap-x-32 mb-10'>
        <Activity className='text-amber-600 w-min animate-pulse' size={30} />
        <h2 className='text-3xl text-center text-slate-600 underline underline-offset-4 font-medium'>
          Latest article
        </h2>
        <Activity className='text-amber-600 w-min animate-pulse' size={30} />
      </div>
      <ArticleLink article={article} />
    </>
  );
};

export default LatestArticle;
