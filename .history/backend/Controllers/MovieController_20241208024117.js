import Movie from '../Models/MovieModels.js'

// CreateMovie
export const createMovie = async (req, res) => {
    try {
      const { title, img, describe, linkTrailer, showDate, genre, cast, rating,type,director } = req.body;
      const newMovie = new Movie({
        title,
        img,
        describe,
        linkTrailer,
        showDate,
        genre,
        cast,
        rating,
        type,
        director
      });
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  // Get All Movie
  export const getAllMovie = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Movie By Id
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Truy vấn bằng ID
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie); // Trả về dữ liệu phim
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving movie' });
      }
    };

// Get 
export const getReleasedMovies = async(req,res) =>{
    try {
        const releasedMovies = await Movie.find({ isReleased: true }); 
        res.json(releasedMovies); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving released movies' });
      }
}

//
export const getNotReleasedMovies = async(req,res) =>{
    try {
        const notReleasedMovies = await Movie.find({ isReleased: false }); 
        res.json(notReleasedMovies); 
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving not released movies' });
      }
}
