import express from "express";
import { GlobalErrorHandler } from "./app/middlewars/GlobalErrorhandler";
const app = express();

app.get("/", (req, res) => {
  res.send("a");
});

app.use(GlobalErrorHandler);

export default app;
