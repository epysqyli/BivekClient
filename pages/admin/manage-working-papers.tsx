import type { ReactElement } from "react";
import type NextPageLayout from "../../types/NextPageLayout";
import AdminLayout from "../../layout/AdminLayout";

const ManageWorkingPapers: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

ManageWorkingPapers.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default ManageWorkingPapers;
