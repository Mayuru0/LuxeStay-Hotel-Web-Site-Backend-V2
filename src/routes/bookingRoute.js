import express from "express";

import { customerProtect, protect } from "../middlewares/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";

const bookingRouter= express.Router();


bookingRouter.post("/create",protect ,customerProtect,createBooking);




export default bookingRouter;