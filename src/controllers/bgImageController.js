import BgImage from "../models/bgImageModel.js";
import BgImageSettings from "../models/bgImageSettingsModel.js";

/* ────────────────────────────────────────────────
   LIBRARY  –  background image collection
   ──────────────────────────────────────────────── */

export const createBgImage = async (req, res) => {
  const { name, imageUrl } = req.body;

  /* Accept either an uploaded file (Cloudinary) or a plain URL */
  const resolvedUrl = req.file ? req.file.path : imageUrl?.trim();

  if (!name?.trim()) {
    return res.status(400).json({ success: false, message: "name is required" });
  }
  if (!resolvedUrl) {
    return res.status(400).json({ success: false, message: "image file or imageUrl is required" });
  }

  try {
    const image = await BgImage.create({ name: name.trim(), imageUrl: resolvedUrl });

    res.status(201).json({
      success: true,
      message: "Background image added",
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add image",
      error: error.message,
    });
  }
};

export const getBgImages = async (req, res) => {
  try {
    const images = await BgImage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch background images",
      error: error.message,
    });
  }
};

export const deleteBgImage = async (req, res) => {
  try {
    const image = await BgImage.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Background image deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

/* ────────────────────────────────────────────────
   SETTINGS  –  section → image URL assignments
   ──────────────────────────────────────────────── */

export const getSettings = async (req, res) => {
  try {
    const settings = await BgImageSettings.findOne();

    res.status(200).json({
      success: true,
      data: settings ? Object.fromEntries(settings.sections) : {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
};

export const updateSettings = async (req, res) => {
  const { sections } = req.body;

  if (!sections || typeof sections !== "object") {
    return res.status(400).json({
      success: false,
      message: "sections object is required",
    });
  }

  try {
    /* Upsert — always keep a single document */
    const settings = await BgImageSettings.findOneAndUpdate(
      {},
      { sections },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Settings saved",
      data: Object.fromEntries(settings.sections),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save settings",
      error: error.message,
    });
  }
};
