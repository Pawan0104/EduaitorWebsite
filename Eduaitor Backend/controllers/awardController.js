import { v2 as cloudinary } from "cloudinary";
import Award from "../models/award.js";

// Upload Helper
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "school/awards",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

export const getAllAwards = async (req, res) => {
  try {
    const awards = await Award.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, awards });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch awards" });
  }
};

export const createAward = async (req, res) => {
  try {
    const { title, year, description, isActive, order } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image required" });

    const result = await uploadToCloudinary(req.file.buffer);
    const award = await Award.create({
      title,
      year,
      description,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      isActive: isActive !== "false",
      order: Number(order) || 0,
    });
    res.status(201).json({ success: true, award });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating award" });
  }
};

export const updateAward = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    const { title, year, description, isActive, order } = req.body;

    if (req.file) {
      await cloudinary.uploader.destroy(award.publicId);
      const result = await uploadToCloudinary(req.file.buffer);
      award.imageUrl = result.secure_url;
      award.publicId = result.public_id;
    }

    award.title = title || award.title;
    award.year = year || award.year;
    award.description = description || award.description;
    award.isActive = isActive !== undefined ? isActive !== "false" : award.isActive;
    award.order = order !== undefined ? Number(order) : award.order;

    await award.save();
    res.json({ success: true, award });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

export const deleteAward = async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);
    if (award) await cloudinary.uploader.destroy(award.publicId);
    await Award.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};