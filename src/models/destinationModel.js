import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    location:    { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    image:      { type: String, required: true, trim: true },
    order:      { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
