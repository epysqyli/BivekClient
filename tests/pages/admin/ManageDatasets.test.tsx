import React from "react";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DatasetCategories from "../../../pages/admin/manage-datasets";
import { OverlayProvider } from "../../../hooks/OverlayContext";
import server from "../../network-handlers/datasetCategoriesHandlers";
import { getDataCategoryById } from "../../../lib/DataCategoryRepo";

const overlayFunctions = {
  showOverlay: jest.fn(),
  hideOverlay: jest.fn()
};

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe("Manage datasets", () => {
  test("should display one dataset category with one dataset", async () => {
    const datasetCategoryResp = await getDataCategoryById(1);
    const datasetCategory = datasetCategoryResp.data;
    render(<DatasetCategories datasetCategoriesProps={[datasetCategory]} />);

    expect(screen.getByText(/Random dataset category/)).toBeInTheDocument();
    expect(screen.getByText(/First random dataset/)).toBeInTheDocument();
  });

  test("should create a new dataset category", async () => {
    const user = userEvent.setup();
    render(
      <OverlayProvider value={overlayFunctions}>
        <DatasetCategories datasetCategoriesProps={[]} />
      </OverlayProvider>
    );

    await user.type(screen.getByLabelText(/input-name/), "Random dataset category");
    await user.click(screen.getByRole("button", { name: /create-dataset-category/ }));

    expect(await screen.findByText(/Random dataset category/)).toBeInTheDocument();
  });

  test("should display and hide delete confirmation button", async () => {
    const datasetCategoryResp = await getDataCategoryById(1);
    const datasetCategory = datasetCategoryResp.data;
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

  test("should delete a dataset category", async () => {
    const datasetCategoryResp = await getDataCategoryById(1);
    const datasetCategory = datasetCategoryResp.data;
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

  test("should create a new dataset", async () => {
    const user = userEvent.setup();
    const datasetCategoryResp = await getDataCategoryById(1);
    const datasetCategory = datasetCategoryResp.data;
    render(
      <OverlayProvider value={overlayFunctions}>
        <DatasetCategories datasetCategoriesProps={[datasetCategory]} />
      </OverlayProvider>
    );

    await user.click(screen.getByRole("button", { name: /show-new-dataset-form/ }));
    expect(screen.getByRole("form", { name: /dataset-form/ })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/input-title/), "Some dataset");
    await user.type(screen.getByLabelText(/input-link/), "https://some-download-link.com");
    await user.click(screen.getByRole("button", { name: /Add dataset to category/ }));

    expect(screen.queryByRole("form", { name: /dataset-form/ })).not.toBeInTheDocument();
    expect(await screen.findByText(/Some dataset/)).toBeInTheDocument();
    expect(await screen.findByText("https://some-download-link.com")).toBeInTheDocument();
  });

  test("should edit an existing dataset", async () => {
    const user = userEvent.setup();
    const datasetCategoryResp = await getDataCategoryById(1);
    const datasetCategory = datasetCategoryResp.data;
    render(
      <OverlayProvider value={overlayFunctions}>
        <DatasetCategories datasetCategoriesProps={[datasetCategory]} />
      </OverlayProvider>
    );

    await user.click(screen.getAllByRole("button", { name: /show-edit-dataset-form/ })[1]);
    expect(screen.getByRole("form", { name: /dataset-form/ })).toBeInTheDocument();

    await user.type(screen.getByLabelText(/input-title/), "A different dataset");
    await user.type(screen.getByLabelText(/input-link/), "https://some-different-download-link.com");
    await user.click(screen.getByRole("button", { name: /Confirm changes/ }));

    expect(screen.queryByRole("form", { name: /dataset-form/ })).not.toBeInTheDocument();
    expect(await screen.findByText(/A different dataset/)).toBeInTheDocument();
    expect(await screen.findByText("https://some-different-download-link.com")).toBeInTheDocument();
  });

  test("should delete a dataset", async () => {
    const user = userEvent.setup();
    const datasetCategoryResp = await getDataCategoryById(1);
    const datasetCategory = datasetCategoryResp.data;
    render(
      <OverlayProvider value={overlayFunctions}>
        <DatasetCategories datasetCategoriesProps={[datasetCategory]} />
      </OverlayProvider>
    );

    await user.click(screen.getAllByRole("button", { name: /delete-dataset/ })[1]);
    await user.click(await screen.findByText("delete", { exact: true }));

    await waitForElementToBeRemoved([
      screen.queryByText(datasetCategory.datasets[1].title, { exact: true }),
      screen.queryByText("delete", { exact: true })
    ]);

    expect(screen.queryByText("delete", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText(datasetCategory.datasets[1].title, { exact: true })).not.toBeInTheDocument();
  });
});
