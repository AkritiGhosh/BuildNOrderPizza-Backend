import express from "express";
import optionRouter from "./routes/options.routes.js";
import cors from "cors";
import { PORT } from "./config/env.js";
import initialDatabase from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParser());
app.use(cors());

app.get("/", (_, response) => {
  return response.status(200).send("App is ready for client requests");
});

app.use("/", authRouter);
app.use("/options", optionRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  await initialDatabase();
  console.log("App is running on port -", PORT);
});
