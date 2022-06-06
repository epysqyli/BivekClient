import { Dispatch, SetStateAction } from "react";
import type { Article, Tag } from "../interfaces/IArticle";
import { createArticleTagRelation, deleteArticleTag } from "./ArticleTagRepo";

const addTag = async (
  tag: Tag,
  currentTags: Array<Tag>,
  setCurrentTags: Dispatch<SetStateAction<Tag[]>>,
  article: Article
): Promise<void> => {
  await createArticleTagRelation({ articleId: article.id, tagId: tag.id });
  setCurrentTags([...currentTags, tag]);
};

const removeTag = async (
  tag: Tag,
  currentTags: Array<Tag>,
  setCurrentTags: Dispatch<SetStateAction<Tag[]>>,
  article: Article
): Promise<void> => {
  await deleteArticleTag({ articleId: article.id, tagId: tag.id });
  setCurrentTags(currentTags.filter((t) => t.id !== tag.id));
};

export { addTag, removeTag };
