interface Tag {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  author: string | null;
  content: string;
}

interface ArticleResp {
  data: Article;
}

interface Article {
  id: number;
  title: string;
  body: string;
  tags: Array<Tag>;
  comments: Array<Comment>;
  createdAt?: string;
  updatedAt?: string;
}

export type { Tag, Comment, ArticleResp, Article };