import Booking from "../models/bookingModel.js";

let STARTING_ID = 1000;

const generateBookingId = async () => {
    const count = await Booking.countDocuments({});
    const newID = "INV" + STARTING_ID + count  ;
    return newID;
};

export default generateBookingId;
