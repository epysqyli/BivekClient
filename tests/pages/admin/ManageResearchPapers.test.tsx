import React from "react";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ManageResearchPapers from "../../../pages/admin/manage-research-papers";
import { OverlayProvider } from "../../../hooks/OverlayContext";
import { act } from "react-dom/test-utils";
import { getWorkingPaper } from "../../../lib/WorkingPaperRepo";
import server from "../../network-handlers/workingPaperHandlers";

const overlayFunctions = {
  showOverlay: jest.fn(),
  hideOverlay: jest.fn()
};

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe("Manage research papers", () => {
  test("should get and display a specific research paper", async () => {
    const mockPaperResp = await getWorkingPaper(1);
    render(<ManageResearchPapers workingPaperProps={[mockPaperResp.data]} />);
    expect(screen.queryByText("Working paper title")).toBeInTheDocument();
  });

  test("should create new research paper", async () => {
    const user = userEvent.setup();
    render(
      <OverlayProvider value={overlayFunctions}>
        <ManageResearchPapers workingPaperProps={[]} />
      </OverlayProvider>
    );

    await user.click(screen.getByRole("button", { name: "add-working-paper" }));
    expect(screen.getByRole("form", { name: "working-paper-form" })).toBeInTheDocument();

    await user.type(screen.getByLabelText("input-title"), "New working paper title");
    await user.type(screen.getByLabelText("input-abstract"), "Abstract of the new working paper");
    await user.type(screen.getByLabelText("input-link"), "link.com");
    await user.click(screen.getByRole("button"));

    await waitForElementToBeRemoved(screen.queryByRole("form", { name: "working-paper-form" }));
    expect(await screen.findByText("New working paper title")).toBeInTheDocument();
    expect(await screen.findByText("Abstract of the new working paper")).toBeInTheDocument();
    expect(await screen.findByText("link.com")).toBeInTheDocument();
  });

  test("should edit research paper", async () => {
    const user = userEvent.setup();
    const mockPaperResp = await getWorkingPaper(1);
    render(
      <OverlayProvider value={overlayFunctions}>
        <ManageResearchPapers workingPaperProps={[mockPaperResp.data]} />
      </OverlayProvider>
    );

    await user.click(screen.getByRole("button", { name: "edit-working-paper" }));
    expect(screen.getByRole("form", { name: "working-paper-form" })).toBeInTheDocument();

    await user.clear(screen.getByLabelText("input-title"));
    await user.type(screen.getByLabelText("input-title"), "Edited working paper title");
    await user.clear(screen.getByLabelText("input-abstract"));
    await user.type(screen.getByLabelText("input-abstract"), "Abstract of the edited working paper");
    await user.clear(screen.getByLabelText("input-link"));
    await user.type(screen.getByLabelText("input-link"), "https://edited-link.com");
    await user.click(await screen.findByRole("button", { name: "submit-form" }));

    await waitForElementToBeRemoved(screen.queryByRole("form", { name: "working-paper-form" }));
    expect(await screen.findByText("Edited working paper title")).toBeInTheDocument();
    expect(await screen.findByText("Abstract of the edited working paper")).toBeInTheDocument();
    expect(await screen.findByText("https://edited-link.com")).toBeInTheDocument();
  });

  test("should delete research paper", async () => {
    const mockPaperResp = await getWorkingPaper(1);
    render(
      <OverlayProvider value={overlayFunctions}>
        <ManageResearchPapers workingPaperProps={[mockPaperResp.data]} />
      </OverlayProvider>
    );

    act(() => {
      const delBtns = screen.getAllByRole("button", { name: "show-delete-working-paper-button" });
      fireEvent.click(delBtns[0]); // papers are ranked in desc order by createdAt
    });
    fireEvent.click(await screen.findByText("delete", { exact: true }));
    await waitForElementToBeRemoved([
      screen.queryByText(mockPaperResp.data.title, { exact: true }),
      screen.queryByText("delete", { exact: true })
    ]);

    expect(screen.queryByText("delete", { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText(mockPaperResp.data.title, { exact: true })).not.toBeInTheDocument();
  });
});
