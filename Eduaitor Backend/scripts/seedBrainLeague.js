// Seeds the EDUAITOR BRAIN LEAGUE defaults if the DB is empty.
// Usage: npm run seed:brain
import "dotenv/config";
import mongoose from "mongoose";
import BrainQuestion from "../models/brainQuestion.js";
import BrainSetting from "../models/brainSetting.js";
import { DEFAULT_SETTINGS, bankToDocuments } from "../data/brainLeagueSeed.js";

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not set. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15_000,
    });
    console.log("Connected to MongoDB");

    const existing = await BrainQuestion.countDocuments();
    if (existing === 0) {
      const docs = bankToDocuments();
      await BrainQuestion.insertMany(docs, { ordered: true });
      console.log(`Inserted ${docs.length} questions into the bank`);
    } else {
      console.log(`Bank already has ${existing} questions — skipping insert`);
    }

    const setting = await BrainSetting.findOne({ key: "global" });
    if (!setting) {
      await BrainSetting.create(DEFAULT_SETTINGS);
      console.log("Created default BRAIN LEAGUE settings (title, share message, 5 badges)");
    } else {
      console.log("Settings already exist — skipping");
    }
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Done");
  }
}

seed();