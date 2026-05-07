// controllers/testimonialController.js
import Testimonial from "../models/testimonial.js";
import cloudinary  from "../middlewares/cloudinary.js";

/* ─────────────────────────────────────────────────────────────────────────────
   CLOUDINARY HELPERS
───────────────────────────────────────────────────────────────────────────── */

/** Upload a buffer to Cloudinary and return the result object. */
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder          : "school/testimonials",
        resource_type   : "image",
        allowed_formats : ["jpg", "jpeg", "png", "webp", "gif", "svg"],
        transformation  : [{ quality: "auto", fetch_format: "auto" }],
      },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

/**
 * FIX ⑦ (partial): Delete an image from Cloudinary by its public_id.
 * Never throws — a failed delete should not block the main response.
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (e) {
    console.error("Cloudinary delete failed:", e.message);
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   FIX ⑧ — helper: coerce FormData string "true"/"false" to real boolean
   FormData always sends strings. `Boolean("false") === true` — always truthy!
───────────────────────────────────────────────────────────────────────────── */
const parseBool = (val, fallback = true) => {
  if (val === undefined || val === null) return fallback;
  if (typeof val === "boolean") return val;
  return String(val).toLowerCase() !== "false";
};

/* ─────────────────────────────────────────────────────────────────────────────
   FIX ⑤ ⑥ — helper: extract ONLY whitelisted fields from req.body
   Never spread/Object.assign the full req.body into a DB document.
   Doing so lets callers inject _id, __v, createdAt, or any hidden field.
───────────────────────────────────────────────────────────────────────────── */
const pickBody = (body) => ({
  // trim all string fields to prevent leading/trailing whitespace in DB
  name    : String(body.name    || "").trim().slice(0, 120),
  role    : String(body.role    || "").trim().slice(0, 120),
  quote   : String(body.quote   || "").trim().slice(0, 1000),
  tag     : String(body.tag     || "").trim().slice(0, 60),
  // clamp rating to 1-5; default 5
  rating  : Math.min(5, Math.max(1, Number(body.rating) || 5)),
  // FIX ⑧: proper boolean coercion
  isActive: parseBool(body.isActive, true),
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/testimonials
   Public — frontend slider uses this.
   ?activeOnly=true  →  only isActive:true records
───────────────────────────────────────────────────────────────────────────── */
// FIX ⑨: wrapped in try/catch so a DB failure returns a clean 500 instead of crashing
export const getTestimonials = async (req, res) => {
  try {
    const filter = {};
    if (req.query.activeOnly === "true") filter.isActive = true;

    const data = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data });
  } catch (err) {
    console.error("getTestimonials:", err);
    res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/testimonials
   multipart/form-data:  image? name role quote tag rating isActive
───────────────────────────────────────────────────────────────────────────── */
export const createTestimonial = async (req, res) => {
  try {
    // FIX ⑤: only pick whitelisted fields — never use ...req.body
    const fields = pickBody(req.body);

    if (!fields.name)  return res.status(400).json({ success: false, message: "Name is required" });
    if (!fields.quote) return res.status(400).json({ success: false, message: "Quote is required" });

    // upload image if provided
    let imageUrl = "";
    let publicId = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      publicId = result.public_id; // FIX ⑦: store publicId for future deletion
    }

    const testimonial = await Testimonial.create({
      ...fields,
      image   : imageUrl,
      publicId: publicId,
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    console.error("createTestimonial:", err);
    res.status(500).json({ success: false, message: "Failed to create testimonial" });
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   PUT /api/testimonials/:id
   Image is optional — omit to keep existing.
───────────────────────────────────────────────────────────────────────────── */
export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    // FIX ⑥: replace Object.assign(t, req.body) with explicit whitelisted assignment
    const fields = pickBody(req.body);
    Object.assign(testimonial, fields);

    // replace image if a new file was uploaded
    if (req.file) {
      // FIX ⑦: delete the OLD Cloudinary image before uploading the new one
      await deleteFromCloudinary(testimonial.publicId);

      const result          = await uploadToCloudinary(req.file.buffer);
      testimonial.image     = result.secure_url;
      testimonial.publicId  = result.public_id;
    }

    await testimonial.save();
    res.json({ success: true, data: testimonial });
  } catch (err) {
    console.error("updateTestimonial:", err);
    res.status(500).json({ success: false, message: "Failed to update testimonial" });
  }
};

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /api/testimonials/:id
───────────────────────────────────────────────────────────────────────────── */
export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    // FIX ⑦: remove image from Cloudinary before deleting the DB record
    await deleteFromCloudinary(testimonial.publicId);

    await testimonial.deleteOne();
    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    console.error("deleteTestimonial:", err);
    res.status(500).json({ success: false, message: "Failed to delete testimonial" });
  }
};