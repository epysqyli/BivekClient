import type { ReactElement } from "react";
import IDataset from "../../interfaces/models/IDataset";

interface Props {
  dataset: IDataset;
}

const DatasetElement = ({ dataset }: Props): ReactElement => {
  return (
    <>
      <div>{dataset.title}</div>
      <div>{dataset.link}</div>
    </>
  );
};

export default DatasetElement;
