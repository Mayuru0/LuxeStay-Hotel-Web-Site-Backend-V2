import bodyParser from "body-parser";
import express from "express";
import userRouter from "./src/routes/usersRoute.js";
import connectDB from './src/config/db.js';
import { PORT } from "./src/config/env.js";
import dotenv from 'dotenv';
import errorHandler from './src/middlewares/error.middleware.js';
import galleryItemRouter from "./src/routes/galleryRoute.js";
import jwt from "jsonwebtoken";
dotenv.config();
const app = express();


app.use(bodyParser.json());


connectDB();
app.use(errorHandler);

app.use ((req, res, next) =>{
    const token =req.header("Authorization")?.replace("Bearer ","")
    
    if(token != null){
        jwt.verify(token,"jwt_secret",(err,decoded) =>{
            if(decoded != null){
                req.body.user = decoded
                next();
            }else{
                next();
            }
            
        })
    }else{
        next();
    }

})



//Routes
app.use("/api/users",userRouter);

app.use("/api/gallery",galleryItemRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}🚀 `);
});

app.use(errorHandler);




 

