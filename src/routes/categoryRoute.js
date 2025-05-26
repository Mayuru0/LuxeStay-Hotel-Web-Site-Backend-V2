import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoriesByName, getCategoryById, updateCategory } from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";


const categoryRouter =express.Router();


categoryRouter.post("/create",protect ,createCategory);

categoryRouter.get("/get" , getCategories);

categoryRouter.get("/getByName/:name",protect , getCategoriesByName);
categoryRouter.get("/getById/:CategoryId",protect , getCategoryById);

categoryRouter.put("/update/:CategoryId",protect, updateCategory);

categoryRouter.delete("/delete/:CategoryId",protect, deleteCategory);




export default categoryRouter;
