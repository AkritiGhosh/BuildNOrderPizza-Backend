import dotenv  from "dotenv"
import express from "express";
import { initDB } from "./lib/dbConfig.js";

dotenv.config()

const app = express();

initDB();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("YOLO");
});

app.listen(process.env.PORT, () => {
  console.log("app is running ", process.env.PORT);
});
