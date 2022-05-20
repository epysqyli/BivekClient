import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type AppPropsWithLayout from "../types/AppPropsWithLayout";

const MyApp = ({ Component, pageProps }: AppPropsWithLayout): ReactNode => {
  const pageWithoutLayout = (page: ReactElement): ReactNode => page;
  const pageWithLayout = Component.getLayout;
  const getPage = pageWithLayout ?? pageWithoutLayout;

  return getPage(<Component {...pageProps} />);
};

export default MyApp;
