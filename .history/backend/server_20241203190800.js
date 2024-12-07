import express, { json } from "express";
const app = express();
const PORT = 5000;


app.use(json());


app.get("/", (req, res) => {
  res.send("Welcome to the Express Backend!");
});


app.get("/api/movies", (req, res) => {
  const movies = [
    { id: 1, name: "Avatar", genre: "Sci-fi" },
    { id: 2, name: "Titanic", genre: "Romance" },
  ];
  res.json(movies);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
