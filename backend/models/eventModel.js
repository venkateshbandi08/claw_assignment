import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  location: { type: String, required: true },
  description: { type: String, required: true },
  guest: { type: String },
  // userId: { type: String, required: true },
});

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
