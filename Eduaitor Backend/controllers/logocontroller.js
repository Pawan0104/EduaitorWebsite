// controllers/logoController.js
import { v2 as cloudinary } from "cloudinary";
import Logo from "../models/logo.js";

cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key    : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

/* ── helper: upload a buffer to Cloudinary ── */
const uploadToCloudinary = (buffer, mimetype) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder        : "school/logos",          // adjust folder name as needed
        resource_type : "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "svg", "gif"],
        transformation : [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

/* ── helper: delete from Cloudinary by public_id ── */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try { await cloudinary.uploader.destroy(publicId); }
  catch (e) { console.error("Cloudinary delete error:", e.message); }
};

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/logos
   Query: ?activeOnly=true  →  only isActive:true logos (used by frontend)
───────────────────────────────────────────────────────────────────────────── */
export const getAllLogos = async (req, res) => {
  try {
    const filter = {};
    if (req.query.activeOnly === "true") filter.isActive = true;

    const logos = await Logo.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    res.json({ success: true, logos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch logos" });
  }
};


export const createLogo = async (req, res) => {
  try {
    const { label, altText, isActive, order } = req.body;
    console.log("Received  data :", { label, altText, isActive, order, file: req.file?.originalname });

    // validation
    if (!label?.trim())
      return res.status(400).json({ success: false, message: "Institution label is required" });
    if (!req.file)
      return res.status(400).json({ success: false, message: "Image file is required" });

    // upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
console.log("Cloudinary upload result:", result);
    const logo = await Logo.create({
      label     : label.trim(),
      altText   : altText?.trim() || "",
      imageUrl  : result.secure_url,          // full Cloudinary CDN URL
      publicId  : result.public_id,           // stored for future deletion
      isActive  : isActive !== "false",
      order     : Number(order) || 0,
    });

    res.status(201).json({ success: true, message: "Logo created", logo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create logo" });
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   PUT /api/logos/:id
   Same fields as POST. Send image only if replacing.
───────────────────────────────────────────────────────────────────────────── */
export const updateLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo)
      return res.status(404).json({ success: false, message: "Logo not found" });

    const { label, altText, isActive, order } = req.body;

    if (label    !== undefined) logo.label    = label.trim();
    if (altText  !== undefined) logo.altText  = altText.trim();
    if (isActive !== undefined) logo.isActive = isActive !== "false" && isActive !== false;
    if (order    !== undefined) logo.order    = Number(order);

    // replace image on Cloudinary if a new file was sent
    if (req.file) {
      await deleteFromCloudinary(logo.publicId);             // remove old
      const result     = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      logo.imageUrl    = result.secure_url;
      logo.publicId    = result.public_id;
    }

    await logo.save();
    res.json({ success: true, message: "Logo updated", logo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update logo" });
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/logos/:id
───────────────────────────────────────────────────────────────────────────── */
export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo)
      return res.status(404).json({ success: false, message: "Logo not found" });

    await deleteFromCloudinary(logo.publicId);   // delete image from Cloudinary
    await logo.deleteOne();

    res.json({ success: true, message: "Logo deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete logo" });
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /api/logos/reorder
   Body: { items: [{ _id, order }] }a
───────────────────────────────────────────────────────────────────────────── */
export const reorderLogos = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || !items.length)
      return res.status(400).json({ success: false, message: "items[] required" });

    const ops = items.map(({ _id, order }) => ({
      updateOne: { filter: { _id }, update: { $set: { order: Number(order) } } },
    }));

    await Logo.bulkWrite(ops);
    res.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to reorder" });
  }
<<<<<<< HEAD
};






















=======
};
>>>>>>> 82f31ec9eb5efc04382e40f75ee6b105d395f8e6
