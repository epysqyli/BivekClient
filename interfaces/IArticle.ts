interface Tag {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  author: string | null;
  content: string;
}

interface Article {
  id: number;
  title: string;
  body: string;
  tags: Array<Tag>;
  comments: Array<Comment>;
  createdAt?: string;
  updatedAt?: string;
  published: boolean;
}

interface ArticleTag {
  articleId: number;
  tagId: number;
}

interface ArticlePatch {
  path: string;
  op: string;
  value: string;
}

export type { Tag, Comment, Article, ArticleTag, ArticlePatch };
