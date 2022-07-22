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
      <Activity className='text-amber-600 w-min mx-auto animate-pulse' size={40} />
      <ArticleLink article={article} />
    </>
  );
};

export default LatestArticle;
