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
    <>
    <Head>
      <title>Datasets</title>
    </Head>
      <SectionHeader resource='dataset' text='Datasets' />
      <div className='lg:w-2/3 mx-auto mt-10'>
        {datasetCategories.map((dc) => (
          <DatasetCategoryElement key={dc.id} datasetCategory={dc} />
        ))}
      </div>
    </>
  );
};

Datasets.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Datasets;
