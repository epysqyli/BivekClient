import { AppProps } from "next/app";
import NextPageWithLayout from "../types/NextPageWithLayout";

interface IAppPropsLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default IAppPropsLayout;
