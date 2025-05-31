import Booking from "../models/bookingModel.js";
import generateBookingId from "../utils/generateBookingId.js";

export const createBooking = async (req, res) => {
    
        const bookingId = await generateBookingId(); 
     
        const {
                email,
                roomId,
                checkInDate,
                checkOutDate,
                status,
                reason,
                notes,
                totalAmount
        } = req.body;


        try{

        const existingBooking = await Booking.findOne({  bookingId,roomId,checkInDate,checkOutDate });
        if (existingBooking) {
            return res.status(400).json({
                message: "Booking already exists",
                success: false,
            });
        }

        const newBooking = new Booking({ 
                bookingId,
                email,
                roomId,
                checkInDate,
                checkOutDate,
                status,
                reason,
                notes,
                totalAmount

        });
        await newBooking.save(); 
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: newBooking,
        });
        }catch(error){
            res.status(500).json({
                success: false,
                message: "Failed to create booking",
                error: error.message,
            });
        }



          
       
};
