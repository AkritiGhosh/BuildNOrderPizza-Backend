import mongoose from "mongoose";
import { DB_URL } from "./env.js";

if (!DB_URL) {
  throw new Error(
    "Please define the MONGODB_CONNECTION_STRING environment variable inside .env"
  );
}

const initialDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to database successfully !!!");
  } catch (error) {
    console.error("Unable to connect to database", error);
    process.exit(1);
  }
};

export default initialDatabase;