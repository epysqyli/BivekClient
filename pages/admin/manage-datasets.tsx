import type { FormEvent, ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, Redirect, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import TopElement from "../../components/admin/TopElement";
import { createDataCategory, getDataCategories } from "../../lib/DataCategoryRepo";
import IDataCategory from "../../interfaces/models/IDataCategory";
import DatasetCategoryElement from "../../components/admin/DatasetCategoryElement";
import { PlusCircle } from "react-feather";

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
  const handleCreateCategory = async (): Promise<void> => {
    if (categoryName.length >= 3) {
      const newDataCategory = await createDataCategory(categoryName);
      setDatasetCategories([...datasetCategories, newDataCategory.data]);
      setCategoryName("");
    }
  };
  const handleCategoryChange = (e: FormEvent<HTMLInputElement>) => setCategoryName(e.currentTarget.value);

  const updateStateAfterDelete = (id: number) => {
    const newDatasetCategories: Array<IDataCategory> = datasetCategories.filter((dC) => dC.id !== id);
    setDatasetCategories(newDatasetCategories);
  };

  return (
    <>
      <TopElement text='Manage datasets and data categories' />
      <div className='flex items-end text-lg w-5/6 mx-auto rounded-md mt-10 mb-16'>
        <div className='w-min mx-auto cursor-pointer group'>
          <PlusCircle
            size={36}
            strokeWidth={1.25}
            className='text-white bg-slate-500 rounded-full group-hover:scale-95 group-active:scale-75 transition-transform'
            onClick={handleCreateCategory}
          />
        </div>
        <input
          type='text'
          className='border-b-2 border-gray-300 block w-4/5 mx-auto pb-1 pl-3 text-center focus:outline-none'
          placeholder='Enter data category name'
          onChange={handleCategoryChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateCategory();
          }}
          value={categoryName}
        />
      </div>
      <div>
        {datasetCategories.map((dataCategory) => {
          return (
            <div className='w-11/12 mx-auto border py-2 my-10 shadow-md rounded' key={dataCategory.id}>
              <DatasetCategoryElement
                dataCategory={dataCategory}
                updateStateAfterDelete={updateStateAfterDelete}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

DatasetCategories.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default DatasetCategories;
