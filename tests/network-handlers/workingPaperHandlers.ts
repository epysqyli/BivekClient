import { rest } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  rest.get("http://localhost:5010/workingpapers/1", async (req, res, ctx) => {
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
  }),

  rest.post("http://localhost:5010/workingpapers", async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        title: "New working paper title",
        abstract: "Abstract of the new working paper",
        link: "link.com",
        datasetLink: "dataset-link.com",
        createdAt: "09 July, 2022"
      })
    );
  }),

  rest.patch("http://localhost:5010/workingpapers/1", async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        title: "Edited working paper title",
        abstract: "Abstract of the edited working paper",
        link: "https://edited-link.com",
        datasetLink: null,
        createdAt: "09 July, 2022"
      })
    );
  }),

  rest.delete("http://localhost:5010/workingpapers/1", async (req, res, ctx) => {
    return res(ctx.status(204), ctx.json({}));
  })
];

export default setupServer(...handlers);
