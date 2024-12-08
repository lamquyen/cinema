import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./Routes/UserRouter.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { connect } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect DB
connect();

app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/api/users", userRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
