import Room from "../models/roomModel.js"



export const createRoom = async (req, res) => {
 const room = req.body

 const newRoom = new Room(room)

 try{
    await newRoom.save();
    res.status(201).json({
        success: true,
        message:"Room Created successfully ",
        data: newRoom,
    });
 }catch(error){
    res.status(500).json({
        success: false,
        message: "Failed to create room",
        error: error.message,
    });
 }

}