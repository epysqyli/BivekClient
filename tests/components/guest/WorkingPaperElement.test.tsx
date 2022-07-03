import React from "react";
import { render, screen } from "@testing-library/react";

import IWorkingPaper from "../../../interfaces/models/IWorkingPaper";
import WorkingPaperElement from "../../../components/guest/WorkingPaperElement";

const firstPaper: IWorkingPaper = {
  id: 1,
  title: "First working paper title",
  abstract: "First working paper abstract",
  link: "/first-working-paper-link",
  createdAt: "10 June, 2022"
};

const secondPaper: IWorkingPaper = {
  id: 2,
  title: "Second working paper title",
  abstract: "Second working paper abstract",
  link: "/second-working-paper-link",
  createdAt: "11 June, 2022",
  datasetLink: "/second-working-paper-dataset-download-link"
};

describe("WorkingPaperElement", () => {
  test("should display the basic research paper data fields", () => {
    render(<WorkingPaperElement workingPaper={firstPaper} />);
    const title = screen.getByText(firstPaper.title);
    const abstract = screen.getByText(firstPaper.abstract);
    const link = screen.getByRole("link");
    const createdAt = firstPaper.createdAt !== undefined ? screen.getByText(firstPaper.createdAt) : null;

    expect(title.textContent).toBe(firstPaper.title);
    expect(abstract.textContent).toBe(firstPaper.abstract);
    expect(link).toHaveAttribute("href", firstPaper.link);
    expect(createdAt?.textContent).toBe(firstPaper.createdAt);
  });

  test("should display all research paper data fields", () => {
    render(<WorkingPaperElement workingPaper={secondPaper} />);
    const title = screen.getByText(secondPaper.title);
    const abstract = screen.getByText(secondPaper.abstract);
    const link = screen.getByRole("link", { name: "Download paper" });
    const createdAt = secondPaper.createdAt !== undefined ? screen.getByText(secondPaper.createdAt) : null;
    const datasetLink =
      secondPaper.datasetLink !== undefined ? screen.getByRole("link", { name: "Download dataset" }) : null;

    expect(title.textContent).toBe(secondPaper.title);
    expect(abstract.textContent).toBe(secondPaper.abstract);
    expect(createdAt?.textContent).toBe(secondPaper.createdAt);
    expect(link).toHaveAttribute("href", secondPaper.link);
    expect(datasetLink).toHaveAttribute("href", secondPaper.link);
  });
});
