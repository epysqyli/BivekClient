import React from "react";
import axios from "axios";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import IDataset from "../../../interfaces/models/IDataset";
import IDataCategory from "../../../interfaces/models/IDataCategory";
import DatasetCategories from "../../../pages/admin/manage-datasets";
import { OverlayProvider } from "../../../hooks/OverlayContext";

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

const overlayFunctions = {
  showOverlay: jest.fn(),
  hideOverlay: jest.fn()
};

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;
axiosMock.get.mockResolvedValue({ status: 204 });

describe("Manage datasets page", () => {
  test("should display one dataset category with two datasets", () => {
    render(<DatasetCategories datasetCategoriesProps={[datasetCategory]} />);

    expect(screen.getByText("First dataset category")).toBeInTheDocument();
    expect(screen.getByText("First dataset")).toBeInTheDocument();
    expect(screen.getByText("Second dataset")).toBeInTheDocument();
  });

  test("should display and hide delete confirmation button", async () => {
    render(
      <OverlayProvider value={overlayFunctions}>
        <DatasetCategories datasetCategoriesProps={[datasetCategory]} />
      </OverlayProvider>
    );

    expect(screen.queryByText("delete")).not.toBeInTheDocument();

    fireEvent.click(await screen.findByRole("button", { name: /show-delete-category-button/ }));
    expect(screen.getByText("delete", { exact: true })).toBeInTheDocument();

    fireEvent.click(await screen.findByRole("button", { name: /close-delete-button/ }));
    await waitForElementToBeRemoved(await screen.findByText("delete"));
    expect(screen.queryByText("delete", { exact: true })).not.toBeInTheDocument();
  });

  test("should delete dataset category", async () => {
    render(
      <OverlayProvider value={overlayFunctions}>
        <DatasetCategories datasetCategoriesProps={[datasetCategory]} />
      </OverlayProvider>
    );

    fireEvent.click(await screen.findByRole("button", { name: /show-delete-category-button/ }));
    fireEvent.click(await screen.findByText("delete", { exact: true }));
    await waitForElementToBeRemoved([
      screen.queryByText(datasetCategory.name, { exact: true }),
      screen.queryByText("delete", { exact: true })
    ]);

    expect(screen.queryByText("delete", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText(datasetCategory.name, { exact: true })).not.toBeInTheDocument();
  });
});
