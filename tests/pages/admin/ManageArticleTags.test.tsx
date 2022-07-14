import React from "react";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OverlayProvider } from "../../../hooks/OverlayContext";
import server from "../../network-handlers/articleTagsHandlers";
import ArticleTags from "../../../pages/admin/manage-article-tags";
import { getTags } from "../../../lib/TagRepo";

const overlayFunctions = {
  showOverlay: jest.fn(),
  hideOverlay: jest.fn()
};

beforeAll(() => server.listen());
afterEach(() => server.restoreHandlers());
afterAll(() => server.close());

describe("Manage article tags", () => {
  test("should display existing tags", async () => {
    userEvent.setup();
    const tagsResp = await getTags();
    render(
      <OverlayProvider value={overlayFunctions}>
        <ArticleTags tags={tagsResp.data} />
      </OverlayProvider>
    );

    expect(screen.getAllByText("fake tag", { exact: false })).toHaveLength(2);
  });

  test("should create new tag", async () => {
    userEvent.setup();
    const tagsResp = await getTags();
    render(
      <OverlayProvider value={overlayFunctions}>
        <ArticleTags tags={tagsResp.data} />
      </OverlayProvider>
    );

    await userEvent.type(screen.getByLabelText("input-tag-name"), "new fake tag");
    fireEvent.keyDown(screen.getByLabelText("input-tag-name"), { key: "Enter" });
    expect(await screen.findByText("new fake tag")).toBeInTheDocument();
  });

  test("should delete existing tag", async () => {
    userEvent.setup();
    const tagsResp = await getTags();
    render(
      <OverlayProvider value={overlayFunctions}>
        <ArticleTags tags={tagsResp.data} />
      </OverlayProvider>
    );

    await userEvent.click(screen.getAllByRole("button", { name: "show-delete-tag-button" })[1]);
    expect(await screen.findByText("delete", { exact: true })).toBeInTheDocument();
    await userEvent.click(screen.getByText("delete"));
    await waitForElementToBeRemoved([
      screen.queryByText("delete", { exact: true }),
      screen.queryByText("first fake tag", { exact: true })
    ]);

    expect(screen.queryByText("first fake tag")).not.toBeInTheDocument();
  });
});
