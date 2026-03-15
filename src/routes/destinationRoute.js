import express from "express";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";
import {
  getDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
  toggleFeatured,
} from "../controllers/destinationController.js";

const destinationRouter = express.Router();

destinationRouter.get("/get",                                                       getDestinations);
destinationRouter.post("/create",   protect, adminProtect, upload.single("image"),  createDestination);
destinationRouter.put("/:id",       protect, adminProtect, upload.single("image"),  updateDestination);
destinationRouter.delete("/:id",          protect, adminProtect,                         deleteDestination);
destinationRouter.patch("/:id/featured",  protect, adminProtect,                         toggleFeatured);

export default destinationRouter;
