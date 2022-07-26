import { rest } from "msw";
import { setupServer } from "msw/node";
import ITag from "../../interfaces/models/ITag";

const handlers = [
  rest.get("http://localhost:5010/tags", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: "first fake tag"
        },
        {
          id: 2,
          name: "second fake tag"
        }
      ])
    );
  }),

  rest.get("http://localhost:5010/tags/1", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: "first fake tag"
      })
    );
  }),

  rest.post("http://localhost:5010/tags", async (req, res, ctx) => {
    const { name } = req.body as ITag;

    return res(
      ctx.status(201),
      ctx.json({
        id: 3,
        name: name
      })
    );
  }),

  rest.delete("http://localhost:5010/tags/1", async (req, res, ctx) => {
    return res(ctx.status(204), ctx.json({}));
  })
];

export default setupServer(...handlers);
