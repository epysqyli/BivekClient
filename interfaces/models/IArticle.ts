import type ITag from "./ITag";
import type IComment from "./IComment";

interface IArticle {
  id: number;
  title: string;
  body: string;
  tags: Array<ITag>;
  comments: Array<IComment>;
  createdAt?: string;
  updatedAt?: string;
  published: boolean;
}

export default IArticle;
