import React from "react";
import { render, screen } from "@testing-library/react";

import IWorkingPaper from "../../../interfaces/models/IWorkingPaper";
import WorkingPaperElement from "../../../components/admin/WorkingPaperElement";

const baseWorkingPaper: IWorkingPaper = {
  id: 1,
  title: "First working paper",
  abstract: "First abstract",
  link: "https://first-link.com"
};

const fullWorkingPaper: IWorkingPaper = {
  id: 1,
  title: "First working paper",
  abstract: "First abstract",
  link: "https://first-link.com",
  datasetLink: "https://first-download-link.com"
};

const replaceWorkingPapersInState = jest.fn();
const removeWorkingPaperFromState = jest.fn();

describe("Working paper element", () => {
  test("should display title, abstract, link, createdAt", async () => {
    render(
      <WorkingPaperElement
        workingPaper={baseWorkingPaper}
        removeWorkingPaperFromState={removeWorkingPaperFromState}
        replaceWorkingPapersInState={replaceWorkingPapersInState}
      />
    );

    const { title, abstract, link, createdAt } = baseWorkingPaper;
    expect(screen.getByText(title).textContent).toEqual(baseWorkingPaper.title);
    expect(screen.getByText(abstract).textContent).toEqual(baseWorkingPaper.abstract);
    expect(screen.getByText(link).textContent).toEqual(baseWorkingPaper.link);
    if (createdAt) expect(screen.getByText(createdAt).textContent).toEqual(baseWorkingPaper.createdAt);
  });

  test("should display title, abstract, link, createdAt, datasetLink", async () => {
    render(
      <WorkingPaperElement
        workingPaper={fullWorkingPaper}
        removeWorkingPaperFromState={removeWorkingPaperFromState}
        replaceWorkingPapersInState={replaceWorkingPapersInState}
      />
    );

    const { title, abstract, link, createdAt, datasetLink } = baseWorkingPaper;
    expect(screen.getByText(title).textContent).toEqual(baseWorkingPaper.title);
    expect(screen.getByText(abstract).textContent).toEqual(baseWorkingPaper.abstract);
    expect(screen.getByText(link).textContent).toEqual(baseWorkingPaper.link);
    if (createdAt) expect(screen.getByText(createdAt).textContent).toEqual(baseWorkingPaper.createdAt);
    if (datasetLink) expect(screen.getByText(datasetLink).textContent).toEqual(baseWorkingPaper.datasetLink);
  });
});
