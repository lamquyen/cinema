import Room from "../Models/RoomModels";



export const CreateRoom = async(req,res) =>{
    const {
        roomName,
        seat,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP
      } = req.body;
    
      const newRoom = new Room({
       roomName,
       seat,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP,
      });
    
      try {
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}