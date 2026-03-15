import mongoose from "mongoose";

/**
 * Single-document settings model.
 * Stores a map of section keys → image URLs.
 * e.g. { homeHero: "https://...", homeRooms: "https://...", ... }
 *
 * Only ONE document will ever exist (upserted on every save).
 */
const bgImageSettingsSchema = new mongoose.Schema(
  {
    sections: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

const BgImageSettings = mongoose.model("BgImageSettings", bgImageSettingsSchema);
export default BgImageSettings;
