import express,{ Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import appRoutes from "./routes";
import connectToMongoDB from "./config/mongoDB";
import { PORT } from "./config/constants";

// Create a new express application instance
const app: express.Application = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// Define Routes
app.use("/api", appRoutes);

// Connect to MongoDB
connectToMongoDB().then((db) => {
  app.locals.db = db;

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

//Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
  res.status(500).send(err.message);
});

