import "../styles/globals.scss";
import "../styles/editor.scss";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import NextPageLayout from "../types/NextPageLayout";
import { useRouter } from "next/router";
import FullScreenLoader from "../components/FullScreenLoader";

interface IAppPropsLayout extends AppProps {
  Component: NextPageLayout;
}

const MyApp = ({ Component, pageProps }: IAppPropsLayout): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return () => router.events.off("routeChangeComplete", () => {});
  }, [router.events]);

  const pageWithoutLayout = (page: ReactElement): ReactNode => page;
  const pageWithLayout = Component.getLayout;
  const getPage = pageWithLayout ?? pageWithoutLayout;

  return (
    <>
      {loading ? <FullScreenLoader /> : null}
      {getPage(<Component {...pageProps} />)}
    </>
  );
};

export default MyApp;
