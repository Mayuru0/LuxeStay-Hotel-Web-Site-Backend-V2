import express from "express";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";
import {
  createBgImage,
  getBgImages,
  deleteBgImage,
  getSettings,
  updateSettings,
} from "../controllers/bgImageController.js";

const bgImageRouter = express.Router();

/* Library — upload.single('image') handles both file and URL (file is optional) */
bgImageRouter.post("/create", protect, adminProtect, upload.single("image"), createBgImage);
bgImageRouter.get("/get", getBgImages);
bgImageRouter.delete("/delete/:id", protect, adminProtect, deleteBgImage);

/* Section settings */
bgImageRouter.get("/settings", getSettings);
bgImageRouter.put("/settings", protect, adminProtect, updateSettings);

export default bgImageRouter;
