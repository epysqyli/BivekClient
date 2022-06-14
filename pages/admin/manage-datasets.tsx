import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, Redirect, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import TopElement from "../../components/admin/TopElement";
import { getDataCategories } from "../../lib/DataCategoryRepo";
import IDataCategory from "../../interfaces/models/IDataCategory";
import DatasetCategoryElement from "../../components/admin/DatasetCategoryElement";

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

  const datasets = await getDataCategories();
  return { props: { datasets: datasets.data } };
};

interface Props {
  datasets: Array<IDataCategory>;
}

const DatasetCategories: NextPageLayout<Props> = ({ datasets }: Props): ReactElement => {
  return (
    <>
      <TopElement text='Manage datasets and data categories' />
      <div>
        {datasets.map((dataCategory) => {
          return (
            <div className='w-11/12 mx-auto border py-2 shadow-md rounded' key={dataCategory.id}>
              <DatasetCategoryElement dataCategory={dataCategory} />
            </div>
          );
        })}
      </div>
    </>
  );
};

DatasetCategories.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default DatasetCategories;
