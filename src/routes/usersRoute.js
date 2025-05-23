import express from "express";
import { createUser, getUser, loginUser } from "../controllers/usersController.js";



const userRouter =express.Router();


userRouter.get("/",getUser);

userRouter.post("/createuser",createUser);
userRouter.post("/login",loginUser);









export default userRouter;