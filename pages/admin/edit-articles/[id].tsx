import type NextPageLayout from "../../../types/NextPageLayout";
import type IArticle from "../../../interfaces/models/IArticle";
import type IPatch from "../../../interfaces/models/IPatch";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosError, AxiosResponse } from "axios";
import type { JSONContent } from "@tiptap/react";
import type { FormEvent } from "react";
import { useContext, useState, useEffect } from "react";
import type { ReactElement } from "react";
import type ITag from "../../../interfaces/models/ITag";
import AssignTags from "../../../components/admin/AssignTags";
import { getTags } from "../../../lib/TagRepo";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  getArticleById,
  hideArticle,
  patchArticle,
  publishArticle,
  deleteArticle
} from "../../../lib/ArticleRepo";
import { checkLogin } from "../../../lib/Auth";
import TipTap from "../../../components/tiptap/TipTap";
import { generateHTML, generateJSON } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import { isArticleValid } from "../../../lib/ArticleEditMethods";
import CreateMenuBtn from "../../../components/admin/CreateMenuBtn";
import TopElement from "../../../components/admin/TopElement";
import DeleteConfirmation from "../../../components/admin/DeleteConfirmation";
import { Trash2, Eye, EyeOff, Save, Tag as TagIcon, ToggleLeft } from "react-feather";
import { OverlayContext } from "../../../hooks/OverlayContext";
import Head from "next/head";
import ArticleChangeConfirmation from "../../../components/admin/ArticleChangeConfirmation";
import IPatchValidationError from "../../../interfaces/IPatchValidationError";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{} | Redirect>> => {
  const isLogged: boolean = await checkLogin(context);
  if (isLogged === false) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    };
  }

  const resp: AxiosResponse<IArticle> = await getArticleById(Number(context.query.id));
  const article: IArticle = resp.data;
  const body: string = generateHTML(JSON.parse(article.body), [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"]
    }),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    TableCell,
    Image
  ]);

  article.body = body;
  const tags = await getTags();

  return { props: { article: article, tags: tags.data } };
};

interface Props {
  article: IArticle;
  tags: Array<ITag>;
}

const EditArticle: NextPageLayout<Props> = ({ article, tags }: Props): ReactElement => {
  const [titlePatch, setTitlePatch] = useState<IPatch>({
    path: "title",
    op: "replace",
    value: article.title
  });
  const [bodyPatch, setBodyPatch] = useState<IPatch>({
    path: "body",
    op: "replace",
    value: JSON.stringify(
      generateJSON(article.body, [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"]
        }),
        Table.configure({
          resizable: true
        }),
        TableRow,
        TableHeader,
        TableCell,
        Image
      ])
    )
  });
  const [isValid, setIsValid] = useState<boolean>(isArticleValid(titlePatch.value, bodyPatch.value));
  useEffect(
    () => setIsValid(isArticleValid(titlePatch.value, bodyPatch.value)),
    [titlePatch.value, bodyPatch.value]
  );

  const [allTags] = useState<Array<ITag>>(tags);
  const [currentTags, setCurrentTags] = useState<Array<ITag>>(article.tags);
  const [showTagsMenu, setTagsMenu] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(article.published);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [currentChange, setCurrentChange] = useState<string>("");
  const [showChangeConfirmation, setShowChangeConfirmation] = useState<boolean>(false);
  const [editError, setEditError] = useState<string>("");

  const displayChangeConfirmation = () => setShowChangeConfirmation(true);
  const hideChangeConfirmation = () => setShowChangeConfirmation(false);

  const showEditAnimation = (text: string) => {
    setCurrentChange(text);
    showOverlay();
    displayChangeConfirmation();
    setTimeout(() => {
      hideChangeConfirmation();
      hideOverlay();
    }, 2000);
  };

  const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
    setTitlePatch({ ...titlePatch, value: e.currentTarget.value.trim() });
  };

  const updateBody = (content: JSONContent) => setBodyPatch({ ...bodyPatch, value: JSON.stringify(content) });

  const handlePatchArticle = async (): Promise<void> => {
    try {
      await patchArticle(article.id, [titlePatch, bodyPatch]);
      showEditAnimation("changes saved!");
      setEditError("");
    } catch (error) {
      const errorWrapper = error as AxiosError;
      const errorData = errorWrapper.response!.data as IPatchValidationError;
      setEditError(errorData.Title![0]);
    }
  };

  const toggleAssignTags = (): void => (showTagsMenu ? setTagsMenu(false) : setTagsMenu(true));
  const handleToggle = (): void => toggleAssignTags();

  const togglePublishStatus = async (): Promise<void> => {
    if (isPublished) {
      const resp: AxiosResponse<IArticle> = await hideArticle(article.id);
      setIsPublished(resp.data.published);
      showEditAnimation("article hidden");
    } else {
      const resp: AxiosResponse<IArticle> = await publishArticle(article.id);
      setIsPublished(resp.data.published);
      showEditAnimation("article published!");
    }
  };

  const { showOverlay, hideOverlay } = useContext(OverlayContext);
  const showDeleteConfirmation = () => {
    setShowDelete(true);
    showOverlay();
  };
  const hideDeleteConfirmation = () => {
    setShowDelete(false);
    hideOverlay();
  };

  const activeIcon = "w-min mx-auto my-2 text-amber-800";
  const disabledIcon = "w-min mx-auto my-2 text-amber-300";

  const baseTitleStyle =
    "border-b border-gray-300 bg-transparent focus:border-slate-400 mx-auto text-center text-xl block w-full py-1 px-2 mb-2 focus:outline-none dark:text-slate-100";
  const errorTitleStyle =
    baseTitleStyle + " text-red-600 dark:text-amber-700 bg-red-100 border-red-400 animate-pulse";

  return (
    <div className='2xl:flex justify-around mt-10 2xl:mt-16 w-11/12 md:w-4/5 xl:w-2/3 2xl:w-11/12 mx-auto'>
      <>
        <Head>
          <title>Edit article</title>
        </Head>
        <div className='mx-auto 2xl:w-1/3'>
          <TopElement text='Edit article' />
          <div className='block w-5/6 mx-auto'>
            <input
              onChange={handleTitleChange}
              defaultValue={article.title}
              type='text'
              name='title'
              id='title'
              placeholder='title required'
              className={editError.length === 0 ? baseTitleStyle : errorTitleStyle}
            />
          </div>

          <div className='mt-10 py-2 flex'>
            <CreateMenuBtn
              text='tags'
              isArticleValid={isValid}
              handleClick={handleToggle}
              icon={<TagIcon size={26} className={isValid ? activeIcon : disabledIcon} />}
            />

            <CreateMenuBtn
              text='save'
              isArticleValid={isValid}
              handleClick={handlePatchArticle}
              icon={<Save size={26} className={isValid ? activeIcon : disabledIcon} />}
            />

            {isPublished ? (
              <CreateMenuBtn
                text='hide'
                isArticleValid={isValid}
                handleClick={togglePublishStatus}
                icon={<EyeOff size={26} className={isValid ? activeIcon : disabledIcon} />}
              />
            ) : (
              <CreateMenuBtn
                text='publish'
                isArticleValid={isValid}
                handleClick={togglePublishStatus}
                icon={<Eye size={26} className={isValid ? activeIcon : disabledIcon} />}
              />
            )}

            <CreateMenuBtn
              text='delete'
              isArticleValid={isValid}
              handleClick={showDeleteConfirmation}
              icon={<Trash2 size={26} className={isValid ? activeIcon : disabledIcon} />}
            />
          </div>

          <div className='mb-10'>
            {showTagsMenu ? (
              <AssignTags
                allTags={allTags}
                currentTags={currentTags}
                setCurrentTags={setCurrentTags}
                articleId={article.id}
              />
            ) : null}
          </div>

          <DeleteConfirmation
            id={article.id}
            show={showDelete}
            resourceType='article'
            hideShow={hideDeleteConfirmation}
            deleteItem={deleteArticle}
            redirectPath='/admin/edit-articles'
          />

          <ArticleChangeConfirmation show={showChangeConfirmation} text={currentChange} />
        </div>
      </>
      <div className='2xl:w-3/5 mx-auto'>
        <div className='p-1'>
          <TipTap updateBody={updateBody} existingContent={article.body} />
        </div>
      </div>
    </div>
  );
};

EditArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default EditArticle;
