import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import initialDatabase from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import authRouter from "./routes/auth.routes.js";
import profileRouter from "./routes/userProfile.routes.js";
import optionRouter from "./routes/options.routes.js";
import orderRouter from "./routes/order.routes.js";

const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cookieParser());
app.use(cors());

app.get("/", (_, response) => {
  return response.status(200).send("App is ready for client requests");
});

app.use("/", authRouter);
app.use("/user", profileRouter)
app.use("/options", optionRouter);
app.use("/order", orderRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  await initialDatabase();
  console.log("App is running on port -", PORT);
});
