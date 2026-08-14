import ContactLead from "../models/contactLead.js";
import { sendContactLeadNotification } from "../utils/Mailer.js";

export const createContactLead = async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const phone = String(req.body.phone || "").replace(/\D/g, "");
    const source = String(req.body.source || "contact-popup").trim();
    const email = String(req.body.email || "").trim();
    const schoolName = String(req.body.schoolName || "").trim();
    const city = String(req.body.city || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please enter your name.",
      });
    }

    if (phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number.",
      });
    }

    const lead = await ContactLead.create({
      name,
      phone,
      source,
    });

    Promise.allSettled([
      sendContactLeadNotification({
        name,
        phone,
        email,
        schoolName,
        city,
        message,
        source,
      }),
    ]).then((results) => {
      results.forEach((r) => {
        if (r.status === "rejected") {
          console.error("Contact lead mail error:", r.reason?.message);
        }
      });
    });

    return res.status(201).json({
      success: true,
      message: "Thanks! Our team will contact you shortly.",
      data: lead,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Unable to submit request. Please try again.",
    });
  }
};

export const getContactLeads = async (req, res) => {
  try {
    const { status, q } = req.query;
    const filter = {};

    if (status && status !== "all") filter.status = status;
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { phone: { $regex: q, $options: "i" } },
      ];
    }

    const leads = await ContactLead.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: leads });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to load leads" });
  }
};

export const updateContactLeadStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const lead = await ContactLead.findByIdAndUpdate(
      req.params.id,
      {
        ...(status ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    return res.json({ success: true, data: lead });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to update lead" });
  }
};

export const deleteContactLead = async (req, res) => {
  try {
    const lead = await ContactLead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }
    return res.json({ success: true, message: "Lead deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to delete lead" });
  }
};
