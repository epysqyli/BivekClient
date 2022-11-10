import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import type { AxiosResponse } from "axios";
import GuestLayout from "../layouts/GuestLayout";
import IDataCategory from "../interfaces/models/IDataCategory";
import { getNonEmptyDataCategories } from "../lib/DataCategoryRepo";
import DatasetCategoryElement from "../components/guest/DatasetCategoryElement";
import SectionHeader from "../components/SectionHeader";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<IDataCategory>> = await getNonEmptyDataCategories();
  const datasetCategories: Array<IDataCategory> = resp.data;

  return { props: { datasetCategories } };
};

interface Props {
  datasetCategories: Array<IDataCategory>;
}

const Datasets: NextPageLayout<Props> = ({ datasetCategories }: Props): ReactElement => {
  return (
    <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto">
    <Head>
      <title>Datasets</title>
    </Head>
      <SectionHeader resource='dataset' text='Datasets' />
      <div className='mt-10'>
        {datasetCategories.map((dc) => (
          <DatasetCategoryElement key={dc.id} datasetCategory={dc} />
        ))}
      </div>
    </div>
  );
};

Datasets.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Datasets;
