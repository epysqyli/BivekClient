import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import type { GetServerSideProps } from "next";
import type { AxiosResponse } from "axios";
import GuestLayout from "../layouts/GuestLayout";
import IDataCategory from "../interfaces/models/IDataCategory";
import { getDataCategories } from "../lib/DataCategoryRepo";
import DatasetCategoryElement from "../components/guest/DatasetCategoryElement";

export const getServerSideProps: GetServerSideProps = async () => {
  const resp: AxiosResponse<Array<IDataCategory>> = await getDataCategories();
  const datasetCategories: Array<IDataCategory> = resp.data;

  return { props: { datasetCategories } };
};

interface Props {
  datasetCategories: Array<IDataCategory>;
}

const Datasets: NextPageLayout<Props> = ({ datasetCategories }: Props): ReactElement => {
  return (
    <div className="md:w-5/6 lg:w-2/3 mx-auto">
      {datasetCategories.map((dc) => (
        <DatasetCategoryElement key={dc.id} datasetCategory={dc} />
      ))}
    </div>
  );
};

Datasets.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Datasets;
