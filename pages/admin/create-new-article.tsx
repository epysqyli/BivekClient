import { FormEvent, ReactElement, useContext } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import type { AxiosError, AxiosResponse } from "axios";
import type IArticle from "../../interfaces/models/IArticle";
import type IPatch from "../../interfaces/models/IPatch";
import type ITag from "../../interfaces/models/ITag";
import type { JSONContent } from "@tiptap/react";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import { useEffect, useState } from "react";
import { createArticle, patchArticle } from "../../lib/ArticleRepo";
import { getTags } from "../../lib/TagRepo";
import TipTap from "../../components/tiptap/TipTap";
import AssignTags from "../../components/admin/AssignTags";
import CreateMenuBtn from "../../components/admin/CreateMenuBtn";
import { isArticleValid } from "../../lib/ArticleEditMethods";
import TopElement from "../../components/admin/TopElement";
import { Eye, Save, Tag as TagIcon } from "react-feather";
import IValidationError from "../../interfaces/IValidationError";
import Head from "next/head";
import { OverlayContext } from "../../hooks/OverlayContext";
import ArticleChangeConfirmation from "../../components/admin/ArticleChangeConfirmation";

export const getServerSideProps: GetServerSideProps<{} | Redirect> = async (
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

  const tags = await getTags();

  return { props: { tags: tags.data } };
};

interface PageProps {
  tags: Array<ITag>;
}

const CreateNewArticle: NextPageLayout<PageProps> = ({ tags }: PageProps): ReactElement => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [titlePatch, setTitlePatch] = useState<IPatch>({ path: "title", op: "replace", value: "" });
  const [bodyPatch, setBodyPatch] = useState<IPatch>({
    path: "body",
    op: "replace",
    value: ""
  });
  const [isPublished, setIsPublished] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [creationError, setCreationError] = useState<string>("");
  const [currentChange, setCurrentChange] = useState<string>("");
  const [showChangeConfirmation, setShowChangeConfirmation] = useState<boolean>(false);
  const [allTags] = useState<Array<ITag>>(tags);
  const [currentTags, setCurrentTags] = useState<Array<ITag>>([]);
  const [showTagsMenu, setTagsMenu] = useState<boolean>(false);

  const displayChangeConfirmation = () => setShowChangeConfirmation(true);
  const hideChangeConfirmation = () => setShowChangeConfirmation(false);
  const { showOverlay, hideOverlay } = useContext(OverlayContext);

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
    setTitle(e.currentTarget.value.trim());
    setTitlePatch({ ...titlePatch, value: e.currentTarget.value.trim() });
  };

  const updateBody = (content: JSONContent) => {
    setBody(JSON.stringify(content));
    setBodyPatch({ ...bodyPatch, value: JSON.stringify(content) });
  };

  const toggleAssignTags = (): void => (showTagsMenu ? setTagsMenu(false) : setTagsMenu(true));

  const handleToggle = async (): Promise<void> => {
    await handleCreateArticle(false, showTagsMenu);
    toggleAssignTags();
  };

  const handleCreateArticle = async (publish: boolean, closingTags?: boolean): Promise<void> => {
    if (id === 0) {
      try {
        const resp: AxiosResponse<IArticle> = await createArticle(title, body, publish);
        setId(resp.data.id);
        setCreationError("");
        if (publish) {
          showEditAnimation("article published!");
          setIsPublished(true);
        } else {
          if (closingTags !== false) showEditAnimation("article saved!");
        }
      } catch (error) {
        const errorWrapper = error as AxiosError;
        const errorData = errorWrapper.response!.data as IValidationError;
        setCreationError(errorData.errors.Title![0]);
      }
    } else {
      await patchArticle(id, [titlePatch, bodyPatch]);
      if (closingTags !== false) {
        if (publish) {
          showEditAnimation("article published!");
          setIsPublished(true);
        } else {
          showEditAnimation("article saved!");
        }
      }
    }
  };

  const activeIcon = "w-min mx-auto my-2 text-amber-800";
  const disabledIcon = "w-min mx-auto my-2 text-slate-300";

  const baseTitleStyle =
    "border-b border-gray-300 bg-transparent focus:border-slate-400 mx-auto text-center text-xl block w-full py-1 px-2 mb-2 focus:outline-none";
  const errorTitleStyle = baseTitleStyle + " text-red-600 bg-red-100 border-red-400 animate-pulse";

  useEffect(() => setIsValid(isArticleValid(title, body)), [title, body]);

  return (
    <>
      <Head>
        <title>Create new article</title>
      </Head>
      <div className='mx-auto lg:w-4/5 xl:w-2/3 2xl:w-1/2'>
        <TopElement text='Create a new article' />
        <div className='block w-5/6 mx-auto'>
          <input
            onChange={handleTitleChange}
            type='text'
            name='title'
            id='title'
            placeholder='Article title'
            className={creationError.length === 0 ? baseTitleStyle : errorTitleStyle}
          />
        </div>

        <div className='w-11/12 mx-auto rounded'>
          <div className='p-1'>
            <TipTap updateBody={updateBody} />
          </div>
        </div>

        <div className='mt-10 lg:w-3/5 mx-auto py-2 flex'>
          <CreateMenuBtn
            text='tags'
            isArticleValid={isValid}
            handleClick={handleToggle}
            icon={<TagIcon size={26} className={isValid ? activeIcon : disabledIcon} />}
          />

          <CreateMenuBtn
            text='save for later'
            isArticleValid={isValid}
            handleClick={() => handleCreateArticle(false)}
            icon={<Save size={26} className={isValid ? activeIcon : disabledIcon} />}
          />
          {isPublished ? (
            <CreateMenuBtn
              text='publish'
              isArticleValid={false}
              handleClick={() => handleCreateArticle(true)}
              icon={<Eye size={26} className={disabledIcon} />}
            />
          ) : (
            <CreateMenuBtn
              text='publish'
              isArticleValid={isValid}
              handleClick={() => handleCreateArticle(true)}
              icon={<Eye size={26} className={isValid ? activeIcon : disabledIcon} />}
            />
          )}
        </div>

        <div>
          {showTagsMenu ? (
            <AssignTags
              allTags={allTags}
              currentTags={currentTags}
              setCurrentTags={setCurrentTags}
              articleId={id}
            />
          ) : null}
        </div>
      </div>

      <ArticleChangeConfirmation show={showChangeConfirmation} text={currentChange} />
    </>
  );
};

CreateNewArticle.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default CreateNewArticle;
