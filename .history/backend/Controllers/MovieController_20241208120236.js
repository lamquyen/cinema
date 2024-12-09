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
        const { released } = req.query; // 'released' là tham số truy vấn từ URL
    
        let query = {};
    
        // Xóa phần giờ, phút, giây trong ngày hiện tại để chỉ so sánh theo ngày
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây thành 0
    
        // Nếu có tham số `released`, lọc theo trạng thái phát hành
        if (released === 'true') {
          query.showDate = { $lte: today }; // Phim đã phát hành (hoặc đang phát hành)
        } else if (released === 'false') {
          query.showDate = { $gt: today }; // Phim chưa phát hành
        }
    
        // Tìm phim theo truy vấn
        const movies = await Movie.find(query);
    
        res.json(movies);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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

// Get Released Movies
export const getReleasedMovies = async(req,res) =>{
    try {
        // Lấy ngày hiện tại
        const today = new Date();

    
        // Lọc các phim có showDate <= ngày hiện tại và showDate >= ngày hiện tại
        const releasedMovies = await Movie.find({
          showDate: { $lte: today } // Phim đã phát hành
        });
        res.json(releasedMovies);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };

//Get  Not Released Movies
export const getNotReleasedMovies = async(req,res) =>{
    try {
        // Lấy ngày hiện tại
        const today = new Date();

    
        const notReleasedMovies = await Movie.find({
          showDate: {  $gt: today } // Phim chưa phát hành
        });
        res.json(notReleasedMovies);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };


//Get 3 flim top rating
export const getTopRating = async(req,res) =>{
  try {
    const today = new Date();

    // Lọc phim đang chiếu, sắp xếp theo rating giảm dần, giới hạn 3 phim
    const movies = await Movie.find({ showDate: { $lte: today } })
      .sort({ rating: -1 }) // Sắp xếp theo rating giảm dần
      .limit(3); // Lấy 3 phim đầu tiên

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

