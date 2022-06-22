import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import GuestLayout from "../layouts/GuestLayout";

const PodcastEpisodes: NextPageLayout = (): ReactElement => {
  return <div></div>;
};

PodcastEpisodes.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default PodcastEpisodes;
