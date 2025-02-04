import mongoose from "mongoose";

export const initDB = () => {
  const DB_URL = process.env.DB_URL;
  mongoose.Promise = global.Promise;

  mongoose
    .connect(DB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.error(err));
};
