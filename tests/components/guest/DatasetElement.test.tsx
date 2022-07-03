import React from "react";
import { render, screen } from "@testing-library/react";

import IDataset from "../../../interfaces/models/IDataset";
import DatasetElement from "../../../components/guest/DatasetElement";

const datasetProps: IDataset = {
  id: 1,
  title: "Dataset title",
  link: "Dataset link",
  dataCategoryId: 1
};

describe("Guest DatasetElement", () => {
  test("should display dataset title", async () => {
    render(<DatasetElement dataset={datasetProps} />);
    const datasetTitle = await screen.findByText("Dataset title");
    expect(datasetTitle.textContent).toBe(datasetProps.title);
  });
});
