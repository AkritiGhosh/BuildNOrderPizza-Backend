import dotenv from "dotenv";
import express from "express";
import { initDB } from "./lib/dbConfig.js";
import optionRouter from "./routes/options.js";

dotenv.config();

const app = express();

app.use(express.json());  // ✅ Fix: Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Optional for form data

initDB();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("YOLO");
});

app.use("/options", optionRouter);

app.listen(process.env.PORT, () => {
  console.log("app is running ", process.env.PORT);
});
