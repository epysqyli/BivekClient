import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import type { GetServerSideProps, Redirect, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import AdminLayout from "../../layouts/AdminLayout";
import { checkLogin } from "../../lib/Auth";
import TopElement from "../../components/admin/TopElement";
import { getDataCategories } from "../../lib/DataCategoryRepo";
import IDataCategory from "../../interfaces/models/IDataCategory";

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
    </>
  );
};

DatasetCategories.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default DatasetCategories;
