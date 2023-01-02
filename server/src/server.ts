import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoute from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";
import subsRoute from "./routes/subs";
import cookieParser from "cookie-parser";

const origin = "http://localhost:3000";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ origin, credentials: true }));
app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoute);
app.use("/api/subs", subsRoute);

dotenv.config();

let port = 4000;
app.listen(port, async () => {
  console.log(`server runnning at port${port}`);
  AppDataSource.initialize()
    .then(async () => {
      console.log("db Initialized");
    })
    .catch((error) => console.log(error));
});
