import type { Dispatch, SetStateAction } from "react";
import type { Tag } from "../interfaces/IArticle";
import { createArticleTagRelation, deleteArticleTag } from "./ArticleTagRepo";

const addTag = async (
  tag: Tag,
  currentTags: Array<Tag>,
  setCurrentTags: Dispatch<SetStateAction<Tag[]>>,
  articleId: number
): Promise<void> => {
  await createArticleTagRelation({ articleId: articleId, tagId: tag.id });
  setCurrentTags([...currentTags, tag]);
};

const removeTag = async (
  tag: Tag,
  currentTags: Array<Tag>,
  setCurrentTags: Dispatch<SetStateAction<Tag[]>>,
  articleId: number
): Promise<void> => {
  await deleteArticleTag({ articleId: articleId, tagId: tag.id });
  setCurrentTags(currentTags.filter((t) => t.id !== tag.id));
};

export { addTag, removeTag };
