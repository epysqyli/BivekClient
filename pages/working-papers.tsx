import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";

const WorkingPapers: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

WorkingPapers.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default WorkingPapers;
