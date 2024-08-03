import userModel from "../models/userModel.js";
// import { supabase } from '../config/db.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sessionModel from "../models/sessionModel.js";

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};
// user registration
const registration = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, error: "User already exists" });
    }

    // Register user with Supabase (commented out)
    // const { user, error } = await supabase.auth.signUp({ email, password });
    // console.log(user);
    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const newUser = new userModel({ email, password: hashedPassword });
    const user = await newUser.save();

    // Inserting login time into session db
    const userId = user._id;
    const ipAddress = req.ip;

    const newSession = new sessionModel({
      userId,
      ipAddress,
    });
    const currSession = await newSession.save();

    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "User registered and logged in successfully",
      token,
      sessionId: currSession._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Authenticatng user with Supabase
    // const { session, error } = await supabase.auth.signIn({ email, password });
    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }
    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    // Save session
    // const newSession = new Session({ user: user._id, ipAddress: req.ip });
    // await newSession.save();

    // Inserting login time into session db
    const userId = user._id;
    const ipAddress = req.ip;

    const newSession = new sessionModel({
      userId,
      ipAddress,
    });
    const currSession = await newSession.save();

    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      sessionId: currSession._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// logout
const logout = async (req, res) => {
  try {
    const currSession = await sessionModel.findByIdAndUpdate(
      req.body.sessionId,
      { logoutTime: Date.now() },
      { new: true }
    );

    if (!currSession) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Unable to logout user" });
  }
};

export { registration, login, logout };
