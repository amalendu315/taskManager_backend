import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

export const PORT = process.env.PORT || "";

export const MONGO_URI = process.env.MONGO_URI ||"";

export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";

export const BCRYPT_CONFIG = {
  saltRounds: 10,
};

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || "",
  expiresIn: "1d",
};
