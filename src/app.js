import express from "express";
import morgan from "morgan";
import gdRoutes from "./routes/googledriverroutes.js";

const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/api", gdRoutes);

export default app;
