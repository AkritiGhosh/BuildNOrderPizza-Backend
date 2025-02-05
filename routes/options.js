import express from "express";
import * as optionController from "../controllers/options.js";

const optionRouter = express.Router();

optionRouter.get("/", optionController?.getAllPizzaOptions);

optionRouter.get("/:category", optionController?.getOptionsByCategory);

optionRouter.post("/add", optionController?.addNewOption);

optionRouter.post("/addMultiple", optionController?.addMultipleOptions);

export default optionRouter;
