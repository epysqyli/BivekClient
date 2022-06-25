import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

type NextPageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?(page: ReactElement): ReactNode;
};

export default NextPageLayout;
