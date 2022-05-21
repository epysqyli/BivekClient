import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type IAppPropsLayout from "../interfaces/IAppPropsLayout";

const MyApp = ({ Component, pageProps }: IAppPropsLayout): ReactNode => {
  const pageWithoutLayout = (page: ReactElement): ReactNode => page;
  const pageWithLayout = Component.getLayout;
  const getPage = pageWithLayout ?? pageWithoutLayout;

  return getPage(<Component {...pageProps} />);
};

export default MyApp;
