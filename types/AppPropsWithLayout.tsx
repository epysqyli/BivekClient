import { AppProps } from "next/app";
import NextPageWithLayout from "./NextPageWithLayout";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default AppPropsWithLayout;
