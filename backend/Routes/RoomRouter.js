import express from 'express'
import { CreateRoom } from '../Controllers/RoomController.js';


const router = express.Router();
router.post("/",CreateRoom);


export default router