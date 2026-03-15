import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomID: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", 
        required: true
    },
    maxGuests: {
        type: Number,
        required: true,
        default: 3
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    },
   
    photos: [
        {
            type: String,
            required: true
        }
    ],
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
