import express from "express";
import { createGalleryItem, getGalleryItems } from "../controllers/galleryController.js";
import { protect } from "../middlewares/authMiddleware.js";



const galleryItemRouter =express.Router();

galleryItemRouter.post("/create",protect ,createGalleryItem);
galleryItemRouter.get("/get",protect , getGalleryItems);


export default galleryItemRouter;