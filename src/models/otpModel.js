import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export const OTP = mongoose.model("Otp", OtpSchema);

export default OTP

