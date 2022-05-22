import { ReactElement } from "react";
import AdminLayout from "../../layout/AdminLayout";
import type NextPageLayout from "../../types/NextPageLayout";

const AdminIndex: NextPageLayout = (): ReactElement => {
  return <div>admin page</div>;
};

AdminIndex.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);

export default AdminIndex;
