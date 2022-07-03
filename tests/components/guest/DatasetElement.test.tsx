import React from "react";
import { render, RenderResult } from "@testing-library/react";

import IDataset from "../../../interfaces/models/IDataset";
import DatasetElement from "../../../components/guest/DatasetElement";

const datasetProps: IDataset = {
  id: 1,
  title: "Dataset title",
  link: "Dataset link",
  dataCategoryId: 1
};

describe("<DatasetElement />", () => {
  test("should display dataset title and download link", () => {
    render(<DatasetElement dataset={datasetProps} />);
  });
});
