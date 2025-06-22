import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoriesByName, getCategoryById, updateCategory } from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";

const categoryRouter =express.Router();


categoryRouter.post("/create",protect,upload.single("image") ,createCategory);

categoryRouter.get("/get" , getCategories);

categoryRouter.get("/getByName/:name",protect , getCategoriesByName);
categoryRouter.get("/getById/:CategoryId",protect , getCategoryById);

categoryRouter.put("/update/:CategoryId",protect,upload.single("image"), updateCategory);

categoryRouter.delete("/delete/:CategoryId",protect, deleteCategory);




export default categoryRouter;
 