import { config } from "dotenv";

config();

export const { PORT, DB_URL, JWT_SECRET, JWT_EXPIRATION } = process.env;
