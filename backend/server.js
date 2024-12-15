import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./Routes/UserRouter.js";
import userMovie from "./Routes/MovieRouter.js";
import userCinema from "./Routes/CinemaRouter.js"
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { connect } from "./config/db.js";
import movieRouter from "./Routes/MovieRouter.js"

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
app.use("/api/movies", userMovie);
app.use("/api/cinemas",userCinema);
app.use("/api/movie", movieRouter)

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
