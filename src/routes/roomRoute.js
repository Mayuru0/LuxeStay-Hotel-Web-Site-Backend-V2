import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createRoom } from "../controllers/roomController.js";

const roomRouter = express.Router();


roomRouter.post("/create",protect ,createRoom);




export default roomRouter;