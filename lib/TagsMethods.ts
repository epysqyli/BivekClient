import type { Dispatch, SetStateAction } from "react";
import type ITag from "../interfaces/models/ITag";
import { createArticleTagRelation, deleteArticleTag } from "./ArticleTagRepo";

const addTag = async (
  tag: ITag,
  currentTags: Array<ITag>,
  setCurrentTags: Dispatch<SetStateAction<ITag[]>>,
  articleId: number
): Promise<void> => {
  await createArticleTagRelation({ articleId: articleId, tagId: tag.id });
  setCurrentTags([...currentTags, tag]);
};

const removeTag = async (
  tag: ITag,
  currentTags: Array<ITag>,
  setCurrentTags: Dispatch<SetStateAction<ITag[]>>,
  articleId: number
): Promise<void> => {
  await deleteArticleTag({ articleId: articleId, tagId: tag.id });
  setCurrentTags(currentTags.filter((t) => t.id !== tag.id));
};

export { addTag, removeTag };
