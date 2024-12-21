import Room from "../Models/RoomModels.js";



export const CreateRoom = async(req,res) =>{
    const {
      cinema,
        roomName,
        seat,
        priceCouple,
        seatsCouple,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP
      } = req.body;
    
      const newRoom = new Room({
        cinema,
       roomName,
       seat,
       priceCouple,
       seatsCouple,
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