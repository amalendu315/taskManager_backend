import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const PORT = process.env.PORT || 3003;

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "taskManagerMaster";

export const BCRYPT_CONFIG = {
  saltRounds: 10,
};

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "secret",
  expiresIn: "1d",
};
