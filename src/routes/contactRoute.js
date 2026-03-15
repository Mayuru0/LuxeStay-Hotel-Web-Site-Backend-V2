import express from "express";
import { protect, adminProtect } from "../middlewares/authMiddleware.js";
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from "../controllers/contactController.js";

const contactRouter = express.Router();

// Public: submit contact form
contactRouter.post("/create", createContact);

// Admin: get all messages
contactRouter.get("/", protect, adminProtect, getContacts);

// Admin: mark as read
contactRouter.patch("/:contactId/read", protect, adminProtect, markAsRead);

// Admin: delete message
contactRouter.delete("/:contactId", protect, adminProtect, deleteContact);

export default contactRouter;
