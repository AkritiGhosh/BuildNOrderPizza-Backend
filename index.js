import express, { response } from "express";
import { PORT } from "./config.js";
const app = express();
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("YOLO");
});
app.listen(PORT, () => {
  console.log("app is running ", PORT);
});
