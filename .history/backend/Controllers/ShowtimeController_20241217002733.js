import Showtime from "../Models/ShowtimeModels";


//CreateShowtime
export const CreateShowtime = async(req,res) =>{
    const {
        cinema,
        movie,
        date,
        times,
        room,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP
      } = req.body;
    
      const newShowtime = new Showtime({
        cinema,
        movie,
        date,
        times,
        room,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP,
      });
    
      try {
        const savedShowtime = await newShowtime.save();
        res.status(201).json(savedShowtime);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}