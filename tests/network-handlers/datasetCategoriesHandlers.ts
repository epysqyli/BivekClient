import { rest } from "msw";
import { setupServer } from "msw/node";
import IDataCategory from "../../interfaces/models/IDataCategory";
import IDataset from "../../interfaces/models/IDataset";

const datasetHandlers = [
  rest.get("http://localhost:5010/datasets/1", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: "Some dataset",
        link: "https://some-download-link.com",
        dataCategoryId: 1
      })
    );
  }),

  rest.post("http://localhost:5010/datasets", async (req, res, ctx) => {
    const { title, link, dataCategoryId } = req.body as IDataset;

    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        title: title,
        link: link,
        dataCategoryId: dataCategoryId
      })
    );
  }),

  rest.patch("http://localhost:5010/datasets/1", async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        title: "A different dataset",
        link: "https://some-different-download-link.com",
        dataCategoryId: 1
      })
    );
  }),

  rest.delete("http://localhost:5010/datasets/1", async (req, res, ctx) => {
    return res(ctx.status(204), ctx.json({}));
  })
];

const datasetCategoriesHandlers = [
  rest.get("http://localhost:5010/datacategories/1", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "Random dataset category",
        datasets: [
          {
            id: 1,
            title: "First random dataset",
            link: "https://first-download-link.com",
            dataCategoryId: 1
          },
          {
            id: 2,
            title: "Second random dataset",
            link: "https://second-download-link.com",
            dataCategoryId: 1
          }
        ]
      })
    );
  }),

  rest.post("http://localhost:5010/datacategories", async (req, res, ctx) => {
    const { name, datasets } = req.body as IDataCategory;

    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        name: name,
        datasets: datasets
      })
    );
  }),

  rest.delete("http://localhost:5010/datacategories/1", async (req, res, ctx) => {
    return res(ctx.status(204), ctx.json({}));
  })
];

export default setupServer(...datasetHandlers, ...datasetCategoriesHandlers);
