import Room from "../models/roomModel.js"
import generateRoomId from "../utils/generateRoomID.js";




export const createRoom = async (req, res) => {
    const roomData = req.body;

    // Generate new room ID
    const newRoomID = await generateRoomId();

    // Merge generated room ID into the room data
    const newRoom = new Room({
        ...roomData,
        roomID: newRoomID,
    });

    try {
        await newRoom.save();
        res.status(201).json({
            success: true,
            message: "Room created successfully",
            data: newRoom,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create room",
            error: error.message,
        });
    }
};



export const getRooms =async(req, res) =>{
    try{
        const rooms =await Room.find();

        if(!rooms.length ===0){
            return res.status(200).json({
                success: true,
                message: "No rooms found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            data: rooms,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch rooms",
            error: error.message,
        });
    }
}


export const getRoomId =async(req, res) =>{
    try{
        const room =await Room.findById(req.params.roomId);

        if(!room){
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }
        res.status(200).json({
            success: true,
            data: room,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch room",
            error: error.message,
        });
    }
}


export const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

       
        room.roomID = req.body.roomID ?? room.roomID;
        room.category = req.body.category ?? room.category;
        room.maxGuests = req.body.maxGuests ?? room.maxGuests;
        room.availability = req.body.availability ?? room.availability;
        room.photos = req.body.photos ?? room.photos;
        room.description = req.body.description ?? room.description;

        const updatedRoom = await room.save();

        res.status(200).json({
            success: true,
            message: "Room updated successfully",
            data: updatedRoom,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update room",
            error: error.message,
        });
    }
};

export const deleteRoom =async(req, res) =>{
    try{
        const room =await Room.findByIdAndDelete(req.params.roomId);

        if(!room){
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Room deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to delete room",
            error: error.message,
        });
    }
}



export const getRoomByCategory = async (req, res) => {
    try {
        const rooms = await Room.find({ category: req.params.category });

        if(!rooms.length ===0){
            return res.status(200).json({
                success: true,
                message: "No rooms found",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            data: rooms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch rooms by category",
            error: error.message,
        });
    }
};