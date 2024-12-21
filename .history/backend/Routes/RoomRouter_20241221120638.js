import express from 'express'
import { CreateRoom } from '../Controllers/RoomController';


const router = express.Router();
router.post("/",CreateRoom);


export default router