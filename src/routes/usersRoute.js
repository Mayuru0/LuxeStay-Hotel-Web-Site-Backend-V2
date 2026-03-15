import express from "express";
import { createUser, deleteUser, getUser, getUserById, getUserprofile, loginUser, resendOTP, updateUser, verifyemail } from "../controllers/usersController.js";
import { adminProtect, protect } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/cloudinary.js";



const userRouter =express.Router();




userRouter.post("/createuser", upload.single("profilePic"),createUser);
userRouter.post("/login",loginUser);

userRouter.post("/verifyemail", verifyemail);
userRouter.post("/resend-otp", resendOTP);

userRouter.get("/",protect,adminProtect, getUser);

userRouter.put("/update/:UserId",upload.single("profilePic"), updateUser);

userRouter.delete("/delete/:UserId",protect,adminProtect, deleteUser);

userRouter.get("/get/:UserId",protect, getUserById);

userRouter.get("/getuserprofile",protect, getUserprofile);








export default userRouter;