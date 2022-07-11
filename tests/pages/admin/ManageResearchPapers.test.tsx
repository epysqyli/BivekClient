import React from "react";
import axios from "axios";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const fullWorkingPaper: IWorkingPaper = {
  id: 2,
  title: "Second working paper",
  abstract: "Second abstract",
  link: "https://second-link.com",
  datasetLink: "https://second-download-link.com"
};

const overlayFunctions = {
  showOverlay: jest.fn(),
  hideOverlay: jest.fn()
};

describe("Manage research papers", () => {
  test("should display two research papers", () => {
    render(<ManageResearchPapers workingPaperProps={[baseWorkingPaper, fullWorkingPaper]} />);

    expect(screen.getAllByText(/working paper/)).toHaveLength(2);
  });

  xtest("should create new research paper", async () => {
    const user = userEvent.setup();
    render(
      <OverlayProvider value={overlayFunctions}>
        <ManageResearchPapers workingPaperProps={[]} />
      </OverlayProvider>
    );

    await user.click(screen.getByRole("button", { name: /add-working-paper/ }));
    expect(screen.getByRole("form", { name: /working-paper-form/ })).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/input-title/);
    const abstractInput = screen.getByLabelText(/input-abstract/);
    const linkInput = screen.getByLabelText(/input-link/);
    await user.type(titleInput, "New research paper");
    await user.type(abstractInput, "Some paper abstract");
    await user.type(linkInput, "https://download-link.com");

    await user.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(screen.queryByRole("form", { name: /working-paper-form/ }));
  });

  xtest("should delete research paper", async () => {
    render(
      <OverlayProvider value={overlayFunctions}>
        <ManageResearchPapers workingPaperProps={[baseWorkingPaper, fullWorkingPaper]} />
      </OverlayProvider>
    );

    act(() => {
      const delBtns = screen.getAllByRole("button", { name: /show-delete-research-paper-button/ });
      fireEvent.click(delBtns[0]); // papers are ranked in desc order by createdAt
    });
    fireEvent.click(await screen.findByText("delete", { exact: true }));
    await waitForElementToBeRemoved([
      screen.queryByText(fullWorkingPaper.title, { exact: true }),
      screen.queryByText("delete", { exact: true })
    ]);

    expect(screen.queryByText("delete", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText(fullWorkingPaper.title, { exact: true })).not.toBeInTheDocument();
  });
});
