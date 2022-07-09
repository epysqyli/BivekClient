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
  id: 2,
  title: "Second working paper",
  abstract: "Second abstract",
  link: "https://second-link.com",
  datasetLink: "https://second-download-link.com"
};

const replaceWorkingPapersInState = jest.fn();
const setCurrentWorkingPaperId = jest.fn();
const showDeleteConfirmation = jest.fn();

describe("Working paper element", () => {
  test("should display title, abstract, link, createdAt", async () => {
    render(
      <WorkingPaperElement
        workingPaper={baseWorkingPaper}
        replaceWorkingPapersInState={replaceWorkingPapersInState}
        setCurrentWorkingPaperId={setCurrentWorkingPaperId}
        showDeleteConfirmation={showDeleteConfirmation}
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
        replaceWorkingPapersInState={replaceWorkingPapersInState}
        setCurrentWorkingPaperId={setCurrentWorkingPaperId}
        showDeleteConfirmation={showDeleteConfirmation}
      />
    );

    const { title, abstract, link, createdAt, datasetLink } = fullWorkingPaper;
    expect(screen.getByText(title).textContent).toEqual(fullWorkingPaper.title);
    expect(screen.getByText(abstract).textContent).toEqual(fullWorkingPaper.abstract);
    expect(screen.getByText(link).textContent).toEqual(fullWorkingPaper.link);
    if (createdAt) expect(screen.getByText(createdAt).textContent).toEqual(fullWorkingPaper.createdAt);
    if (datasetLink) expect(screen.getByText(datasetLink).textContent).toEqual(fullWorkingPaper.datasetLink);
  });
});
