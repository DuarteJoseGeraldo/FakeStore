import express, { Response, Request } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const api = express();
const port = 3030;

api.use(express.json());
api.use(cors());

api.get("/", (req: Request, res: Response) => {
  res.send("FakeStore API is Runing");
});

api.use("/fakestoreapi.com", router);
api.use(errorHandler);

api.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
