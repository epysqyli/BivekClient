import type { ReactElement } from "react";

interface Props {
  resource: string;
  text: string;
}

const SectionHeader = ({ resource, text }: Props): ReactElement => {
  const baseStyle =
    "bg-cover bg-center shadow lg:w-4/5 lg:mt-5 lg:rounded-md border-b-2 border-white mx-auto lg:dark:border-amber-400 lg:shadow-xl";

  let completeStyle = "";
  switch (resource) {
    case "article":
      completeStyle = baseStyle + " bg-article";
      break;
    case "dataset":
      completeStyle = baseStyle + " bg-dataset";
      break;
    case "research":
      completeStyle = baseStyle + " bg-research";
      break;
    case "about":
      completeStyle = baseStyle + " bg-about";
      break;
    case "homepage":
      completeStyle = baseStyle + " bg-homepage";
      break;
    case "admin":
      completeStyle = baseStyle + " bg-admin";
      break;
    case "tag":
      completeStyle = baseStyle + " bg-tag";
      break;
  }

  return (
    <div className={completeStyle}>
      <div className='bg-gray-800 bg-opacity-70 text-white text-4xl lg:text-5xl font-bold text-center py-16 lg:rounded-md'>
        {text}
      </div>
    </div>
  );
};

export default SectionHeader;
