import express from "express";
import { createGalleryItem, getGalleryItems } from "../controllers/galleryController.js";

const galleryItemRouter =express.Router();

galleryItemRouter.post("/create",createGalleryItem);
galleryItemRouter.get("/get",getGalleryItems);


export default galleryItemRouter;