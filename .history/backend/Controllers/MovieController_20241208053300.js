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

// Get 
export const getReleasedMovies = async(req,res) =>{
    try {
        // Lấy ngày hiện tại
        const today = new Date();
today.setUTCHours(0, 0, 0, 0)
    
        // Lọc các phim có showDate <= ngày hiện tại và showDate >= ngày hiện tại
        const movies = await Movie.find({
          showDate: { $gt: today } // Phim đã phát hành
        });
    console.log(movies)
        res.json(movies);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };

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
