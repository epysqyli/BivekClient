import "../styles/globals.scss";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import NextPageLayout from "../types/NextPageLayout";

interface IAppPropsLayout extends AppProps {
  Component: NextPageLayout;
}

const MyApp = ({ Component, pageProps }: IAppPropsLayout): ReactNode => {
  const pageWithoutLayout = (page: ReactElement): ReactNode => page;
  const pageWithLayout = Component.getLayout;
  const getPage = pageWithLayout ?? pageWithoutLayout;

  return getPage(<Component {...pageProps} />);
};

export default MyApp;
