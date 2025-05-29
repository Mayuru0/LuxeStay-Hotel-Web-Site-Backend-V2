import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRoom, deleteRoom, getRooms, updateRoom } from "../controllers/roomController.js";

const roomRouter = express.Router();


roomRouter.post("/create",protect ,createRoom);

roomRouter.get("/get",protect , getRooms);

roomRouter.get("/getById/:RoomId",protect , getRooms);


roomRouter.put("/update/:RoomId",protect, updateRoom);


roomRouter.delete("/delete/:RoomId",protect, deleteRoom);




export default roomRouter;