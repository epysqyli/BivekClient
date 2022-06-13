import IDataset from "./IDataset";

interface IDataCategory {
  id: number;
  name: string;
  datasets: Array<IDataset>;
}

export default IDataCategory;
