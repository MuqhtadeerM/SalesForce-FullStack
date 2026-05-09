import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import salesforceRoutes from "./routes/salesforceRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Salesforce Validation Rule Manager API",
  });
});

app.use("/api/salesforce", salesforceRoutes);

app.use(errorMiddleware);

export default app;
