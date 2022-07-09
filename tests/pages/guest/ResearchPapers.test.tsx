import React from "react";
import { render } from "@testing-library/react";

import IWorkingPaper from "../../../interfaces/models/IWorkingPaper";
import ResearchPapers from "../../../pages/research-papers";

const firstPaper: IWorkingPaper = {
  id: 1,
  title: "First working paper title",
  abstract: "First working paper abstract",
  link: "First working paper link",
  createdAt: "10 June, 2022"
};

const secondPaper: IWorkingPaper = {
  id: 2,
  title: "Second working paper title",
  abstract: "Second working paper abstract",
  link: "Second working paper link",
  createdAt: "11 June, 2022",
  datasetLink: "Second working paper dataset download link"
};

const researchPapers: Array<IWorkingPaper> = [firstPaper, secondPaper];

describe("Guest research paper page", () => {
  const page = render(<ResearchPapers workingPapers={researchPapers} />);

  test("should display the correct amount of research paper elements", async () => {
    const workingPaperElementsCount = page.getAllByText(/working paper title/).length;
    expect(workingPaperElementsCount).toBe(2);
  });
});
