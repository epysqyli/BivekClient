import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";

const Datasets: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

Datasets.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default Datasets;
