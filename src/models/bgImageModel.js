import mongoose from "mongoose";

const bgImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const BgImage = mongoose.model("BgImage", bgImageSchema);
export default BgImage;
