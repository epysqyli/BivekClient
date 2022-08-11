import type ITag from "./ITag";

interface IArticle {
  id: number;
  title: string;
  body: string;
  tags: Array<ITag>;
  createdAt?: string;
  updatedAt?: string;
  published: boolean;
}

export default IArticle;
