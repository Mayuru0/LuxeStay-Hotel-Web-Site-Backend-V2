import express from "express";
import { createUser, getUser, loginUser } from "../controllers/usersController.js";
import { adminProtect, protect } from "../middlewares/authMiddleware.js";




const userRouter =express.Router();


userRouter.get("/",protect,adminProtect, getUser);

userRouter.post("/createuser",createUser);
userRouter.post("/login",loginUser);









export default userRouter;