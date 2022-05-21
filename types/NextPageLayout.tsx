import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

type NextPageLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default NextPageLayout;
