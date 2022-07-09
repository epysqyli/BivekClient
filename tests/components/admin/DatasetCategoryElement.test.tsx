import React from "react";
import { render, screen } from "@testing-library/react";

import IDataset from "../../../interfaces/models/IDataset";
import IDataCategory from "../../../interfaces/models/IDataCategory";
import DatasetCategoryElement from "../../../components/admin/DatasetCategoryElement";

const firstDataset: IDataset = {
  id: 1,
  title: "First dataset",
  link: "https://first-link.com",
  dataCategoryId: 1
};

const secondDataset: IDataset = {
  id: 2,
  title: "Second dataset",
  link: "https://second-link.com",
  dataCategoryId: 1
};

const datasetCategory: IDataCategory = {
  id: 1,
  name: "First dataset category",
  datasets: [firstDataset, secondDataset]
};

const setCurrentDataCategoryId = jest.fn();
const showDataCategoryDeleteConfirmation = jest.fn();

describe("Admin dataset category element", () => {
  test("should display two datasets within one category", () => {
    render(
      <DatasetCategoryElement
        dataCategory={datasetCategory}
        setCurrentDataCategoryId={setCurrentDataCategoryId}
        showDataCategoryDeleteConfirmation={showDataCategoryDeleteConfirmation}
      />
    );
    const firstDatasetOnScreen = screen.getByText("First dataset");
    const secondDatasetOnScreen = screen.getByText("Second dataset");

    expect(firstDatasetOnScreen).toBeInTheDocument();
    expect(secondDatasetOnScreen).toBeInTheDocument();
  });
});
