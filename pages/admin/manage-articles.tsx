import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import AdminLayout from "../../layouts/AdminLayout";

const ManageArticles: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

ManageArticles.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageArticles;
