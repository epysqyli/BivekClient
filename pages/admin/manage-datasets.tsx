import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import AdminLayout from "../../layouts/AdminLayout";

const ManageDatasets: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

ManageDatasets.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageDatasets;
