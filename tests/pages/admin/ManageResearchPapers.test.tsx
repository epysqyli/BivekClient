import React from "react";
import axios from "axios";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import IWorkingPaper from "../../../interfaces/models/IWorkingPaper";
import ManageResearchPapers from "../../../pages/admin/manage-research-papers";
import { OverlayProvider } from "../../../hooks/OverlayContext";
import { act } from "react-dom/test-utils";

const baseWorkingPaper: IWorkingPaper = {
  id: 1,
  title: "First working paper",
  abstract: "First abstract",
  link: "https://first-link.com"
};

const overlayFunctions = {
  showOverlay: jest.fn(),
  hideOverlay: jest.fn()
};

const fullWorkingPaper: IWorkingPaper = {
  id: 2,
  title: "Second working paper",
  abstract: "Second abstract",
  link: "https://second-link.com",
  datasetLink: "https://second-download-link.com"
};

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;
axiosMock.get.mockResolvedValue({ status: 204 });

describe("Manage research papers", () => {
  test("should display two research papers", () => {
    render(<ManageResearchPapers workingPaperProps={[baseWorkingPaper, fullWorkingPaper]} />);

    expect(screen.getAllByText(/working paper/)).toHaveLength(2);
  });

  test("should delete research paper", async () => {
    render(
      <OverlayProvider value={overlayFunctions}>
        <ManageResearchPapers workingPaperProps={[baseWorkingPaper, fullWorkingPaper]} />
      </OverlayProvider>
    );

    act(() => {
      const delBtn = screen.getAllByRole("button", { name: /show-delete-research-paper-button/ })[1];
      fireEvent.click(delBtn);
    });
    fireEvent.click(await screen.findByText("delete", { exact: true }));
    await waitForElementToBeRemoved([
      screen.queryByText(baseWorkingPaper.title, { exact: true }),
      screen.queryByText("delete", { exact: true })
    ]);

    expect(screen.queryByText("delete", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText(baseWorkingPaper.title, { exact: true })).not.toBeInTheDocument();
  });
});
