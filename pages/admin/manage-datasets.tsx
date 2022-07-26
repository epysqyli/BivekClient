import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, Redirect, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useContext, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import TopElement from "../../components/admin/TopElement";
import { createDataCategory, deleteDataCategory, getDataCategories } from "../../lib/DataCategoryRepo";
import IDataCategory from "../../interfaces/models/IDataCategory";
import DatasetCategoryElement from "../../components/admin/DatasetCategoryElement";
import { PlusCircle } from "react-feather";
import DeleteConfirmation from "../../components/admin/DeleteConfirmation";
import { OverlayContext } from "../../hooks/OverlayContext";
import { AxiosError } from "axios";
import IValidationError from "../../interfaces/IValidationError";
import Head from "next/head";

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

  const datasetCategories = await getDataCategories();
  return { props: { datasetCategoriesProps: datasetCategories.data } };
};

interface Props {
  datasetCategoriesProps: Array<IDataCategory>;
}

const DatasetCategories: NextPageLayout<Props> = ({ datasetCategoriesProps }: Props): ReactElement => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [datasetCategories, setDatasetCategories] = useState<Array<IDataCategory>>(datasetCategoriesProps);
  const [currentDataCategoryId, setCurrentDataCategoryId] = useState<number>(0);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [creationError, setCreationError] = useState<string>("");
  const { showOverlay, hideOverlay } = useContext(OverlayContext);
  const showDeleteConfirmation = () => {
    setShowDelete(true);
    showOverlay();
  };
  const hideDeleteConfirmation = () => {
    setShowDelete(false);
    hideOverlay();
  };

  const handleCreateCategory = async (): Promise<void> => {
    if (categoryName.length >= 3) {
      try {
        const newDataCategory = await createDataCategory(categoryName);
        setDatasetCategories([...datasetCategories, newDataCategory.data]);
        setCategoryName("");
        setCreationError("");
      } catch (error) {
        const errorWrapper = error as AxiosError;
        const errorData = errorWrapper.response!.data as IValidationError;
        setCreationError(errorData.errors.Name![0]);
      }
    }
  };
  const handleCategoryChange = (e: FormEvent<HTMLInputElement>) => setCategoryName(e.currentTarget.value);

  const updateStateAfterDelete = (id: number) => {
    const newDatasetCategories: Array<IDataCategory> = datasetCategories.filter((dC) => dC.id !== id);
    setDatasetCategories(newDatasetCategories);
  };

  const baseTitleStyle =
    "border-b-2 border-gray-300 rounded-t block w-4/5 mx-auto py-2 pl-3 text-center focus:outline-none";
  const errorTitleStyle = baseTitleStyle + " text-red-600 bg-red-100 border-red-400 animate-pulse";

  return (
    <>
    <Head><title>Manage datasets</title></Head>
      <div className='mx-auto w-11/12 md:w-4/6 lg:w-3/5 xl:w-1/2'>
        <TopElement text='Manage datasets and data categories' />
        <div className='flex items-center text-lg mx-auto rounded-md mt-10 mb-16'>
          <div className='w-min mx-auto cursor-pointer group'>
            <PlusCircle
              size={36}
              strokeWidth={1.25}
              className='text-white bg-slate-500 rounded-full group-hover:scale-95 group-active:scale-75 transition-transform'
              onClick={handleCreateCategory}
              aria-label='create-dataset-category'
              role='button'
            />
          </div>
          <input
            type='text'
            className={creationError.length === 0 ? baseTitleStyle : errorTitleStyle}
            aria-label='input-name'
            placeholder='Enter data category name'
            onChange={handleCategoryChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateCategory();
            }}
            value={categoryName}
          />
        </div>
        <div>
          {datasetCategories
            .sort((a, b) => (a.id > b.id ? -1 : 1))
            .map((dataCategory) => {
              return (
                <div className='mx-auto border py-2 my-10 shadow-md rounded bg-white' key={dataCategory.id}>
                  <DatasetCategoryElement
                    dataCategory={dataCategory}
                    setCurrentDataCategoryId={setCurrentDataCategoryId}
                    showDataCategoryDeleteConfirmation={showDeleteConfirmation}
                  />
                </div>
              );
            })}
        </div>
        <DeleteConfirmation
          show={showDelete}
          hideShow={hideDeleteConfirmation}
          id={currentDataCategoryId}
          resourceType='dataset category'
          deleteItem={deleteDataCategory}
          updateStateAfterDelete={updateStateAfterDelete}
        />
      </div>
    </>
  );
};

DatasetCategories.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default DatasetCategories;
