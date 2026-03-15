import express from "express";
import { createGalleryItem, deleteGalleryItem, getGalleryItems, getGalleryItemsById, updateGalleryItem } from "../controllers/galleryController.js";
import { adminProtect, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";


const galleryItemRouter =express.Router();

galleryItemRouter.post("/create",protect ,adminProtect,upload.single("image"),createGalleryItem);

galleryItemRouter.get("/get", getGalleryItems);

galleryItemRouter.get("/getById/:GalleryId",protect,adminProtect , getGalleryItemsById);

galleryItemRouter.put("/update/:GalleryId",protect,adminProtect,upload.single("image"), updateGalleryItem);

galleryItemRouter.delete("/delete/:galleryId",protect,adminProtect, deleteGalleryItem);

export default galleryItemRouter;