import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layouts/Layout";

const PodcastEpisodes: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

PodcastEpisodes.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default PodcastEpisodes;
