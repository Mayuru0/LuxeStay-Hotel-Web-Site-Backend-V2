import Room from "../models/roomModel.js";

const generateRoomId = async () => {
    let unique = false;
    let newId;

    while (!unique) {
        // Generate a random 6-digit number
        newId = Math.floor(100000 + Math.random() * 900000);

        // Check if the generated ID already exists
        const existingRoom = await Room.findOne({ roomID: newId });
        if (!existingRoom) {
            unique = true;
        }
    }

    return newId;
};

export default generateRoomId;
