import Cinema from "../Models/CinemaModels";

//CreateCinema
export const createCinema = async(req, res) =>{
    try{
        const {cinemaName,location,img01,img02,img03,address,map,introduce01,introduce02} = req.body;
        const newCinema = new Cinema({cinemaName,location,img01,img02,img03,address,map,introduce01,introduce02});
        await newCinema.save();
        res.status(201).json(newCinema)
    } catch (err){
        res.status(400).send(err.message)
    }
}

//GetAllCinema
export const getAllCinema = async(req,res)=>{
    try {
        const cinemas = await Cinema.find(); // Lấy tất cả dữ liệu
        res.status(200).json(cinemas); // Trả về dữ liệu dưới dạng JSON
      } catch (err) {
        console.error('Error fetching cinemas:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
}