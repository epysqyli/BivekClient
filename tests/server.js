import { setupServer } from "msw/node";
import { getWorkingPaperMock } from './handlers';

const server = setupServer(getWorkingPaperMock);
export default server;
