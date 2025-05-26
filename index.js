import bodyParser from "body-parser";
import express from "express";
import userRouter from "./src/routes/usersRoute.js";
import connectDB from './src/config/db.js';
import { PORT } from "./src/config/env.js";
import dotenv from 'dotenv';
import errorHandler from './src/middlewares/error.middleware.js';
import galleryItemRouter from "./src/routes/galleryRoute.js";
import cors from "cors"
import categoryRouter from "./src/routes/categoryRoute.js";
dotenv.config();
const app = express();





connectDB();
app.use(errorHandler);




// Middleware
app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(bodyParser.json());



//Routes
app.use("/api/users",userRouter);
app.use("/api/gallery",galleryItemRouter);
app.use("/api/category",categoryRouter);


// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  })
})





// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀 `);
});






 

