import "../styles/globals.scss";
import "../styles/editor.scss";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import NextPageLayout from "../types/NextPageLayout";
import { useRouter } from "next/router";
import { DarkModeProvider } from "../hooks/DarkModeContext";
import FullScreenLoader from "../components/FullScreenLoader";

interface IAppPropsLayout extends AppProps {
  Component: NextPageLayout;
}

const MyApp = ({ Component, pageProps }: IAppPropsLayout): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const currentDarkModeStatus = () => (localStorage.getItem("darkMode") === "true" ? true : false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode = () => {
    if (darkMode === false) {
      setDarkMode(true);
      localStorage.setItem("darkMode", "true");
    } else {
      setDarkMode(false);
      localStorage.setItem("darkMode", "false");
    }
  };
  const isDarkMode = (): boolean => darkMode;

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));

    return () => router.events.off("routeChangeComplete", () => {});
  }, [router.events]);

  useEffect(() => setDarkMode(currentDarkModeStatus()), []);

  const pageWithoutLayout = (page: ReactElement): ReactNode => page;
  const pageWithLayout = Component.getLayout;
  const getPage = pageWithLayout ?? pageWithoutLayout;

  return (
    <DarkModeProvider value={{ toggleDarkMode, isDarkMode }}>
      <div className={darkMode ? "dark" : ""}>
        <div className='main-wrapper bg-neutral-100 dark:bg-slate-800'>
          {getPage(<Component {...pageProps} />)}
          {loading ? <FullScreenLoader /> : null}
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default MyApp;
