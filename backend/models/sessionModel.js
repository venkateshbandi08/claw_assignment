import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: String },
  loginTime: { type: Date, default: Date.now },
  logoutTime: { type: Date, default: null },
  ipAddress: { type: String, required: true },
});

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
