import dotent from "dotenv";
import express, { Application, Request, Response } from "express";
import logger from "./misc/logger";

dotent.config();

const app: Application = express();


app.get("/", (req: Request, res: Response) => {
  res.send("Api is running");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.clear();
  logger.info(`Server is running in port ${PORT}`);
});
