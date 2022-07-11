import { rest } from "msw";

const getWorkingPaperMock = rest.get("http://localhost:5010/workingpapers/1", async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      id: 1,
      title: "Working paper title",
      abstract: "Abstract of the working paper",
      link: "link.com",
      datasetLink: null,
      createdAt: "09 July, 2022"
    })
  );
});

export { getWorkingPaperMock };
