import React from "react";
import { render, screen } from "@testing-library/react";

import ITag from "../../../interfaces/models/ITag";
import ArticleTag from "../../../components/admin/ArticleTag";

const tag: ITag = {
  id: 1,
  name: "tag name"
};

describe("Tag element", () => {
  test("should diplay tag name", () => {
    render(<ArticleTag tagName={tag.name} />);
    expect(screen.getByText("tag name")).toBeInTheDocument();
  });
});
