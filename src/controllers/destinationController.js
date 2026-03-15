import Destination from "../models/destinationModel.js";

/* GET all (or featured only with ?featured=true) */
export const getDestinations = async (req, res) => {
  try {
    const filter = req.query.featured === "true" ? { isFeatured: true } : {};
    const destinations = await Destination.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, data: destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch destinations", error: error.message });
  }
};

/* PATCH /:id/featured — toggle isFeatured */
export const toggleFeatured = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }
    destination.isFeatured = !destination.isFeatured;
    await destination.save();
    res.status(200).json({ success: true, message: "Updated", data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update", error: error.message });
  }
};

/* POST create */
export const createDestination = async (req, res) => {
  const { name, location, description, imageUrl, order } = req.body;

  /* Accept uploaded file (Cloudinary) OR plain URL */
  const resolvedImage = req.file ? req.file.path : imageUrl?.trim();

  if (!name?.trim()) {
    return res.status(400).json({ success: false, message: "name is required" });
  }
  if (!resolvedImage) {
    return res.status(400).json({ success: false, message: "image file or imageUrl is required" });
  }

  try {
    const destination = await Destination.create({
      name: name.trim(),
      location: location?.trim() || "",
      description: description?.trim() || "",
      image: resolvedImage,
      order: Number(order) || 0,
    });

    res.status(201).json({ success: true, message: "Destination created", data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create destination", error: error.message });
  }
};

/* PUT update */
export const updateDestination = async (req, res) => {
  const { name, location, description, imageUrl, order } = req.body;

  try {
    const existing = await Destination.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }

    /* If a new file was uploaded use it, else if imageUrl provided use it, else keep existing */
    const resolvedImage = req.file
      ? req.file.path
      : imageUrl?.trim() || existing.image;

    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      {
        name:        name?.trim()        || existing.name,
        location:    location?.trim()    ?? existing.location,
        description: description?.trim() ?? existing.description,
        image:       resolvedImage,
        order:       order !== undefined ? Number(order) : existing.order,
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Destination updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update destination", error: error.message });
  }
};

/* DELETE */
export const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: "Destination not found" });
    }
    res.status(200).json({ success: true, message: "Destination deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete destination", error: error.message });
  }
};
