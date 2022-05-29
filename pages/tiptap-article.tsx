import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import type NextPageLayout from "../types/NextPageLayout";
import Layout from "../layouts/Layout";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

export const getServerSideProps: GetServerSideProps = async () => {
  const json = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Example "
          },
          {
            type: "text",
            marks: [
              {
                type: "bold"
              }
            ],
            text: "Text"
          }
        ]
      }
    ]
  };

  const output = generateHTML(json, [StarterKit]);

  return { props: { articleBody: output } };
};

interface Props {
  articleBody: string;
}

const ShowTipTapArticle: NextPageLayout<Props> = ({ articleBody }: Props): ReactElement => {
  return (
    <div className='text-justify w-4/5 mx-auto mt-10' dangerouslySetInnerHTML={{ __html: articleBody }}></div>
  );
};

ShowTipTapArticle.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default ShowTipTapArticle;
