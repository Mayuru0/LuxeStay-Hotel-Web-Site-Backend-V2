import express from "express";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";
import { getAdminStats, toggleUserStatus, changeUserRole } from "../controllers/adminController.js";

const adminRouter = express.Router();

// All admin routes require authentication + admin role
adminRouter.get("/stats", protect, adminProtect, getAdminStats);
adminRouter.patch("/users/:UserId/status", protect, adminProtect, toggleUserStatus);
adminRouter.patch("/users/:UserId/role", protect, adminProtect, changeUserRole);

export default adminRouter;
