import { AppProps } from "next/app";
import NextPageLayout from "../types/NextPageLayout";

interface IAppPropsLayout extends AppProps {
  Component: NextPageLayout;
}

export default IAppPropsLayout;
