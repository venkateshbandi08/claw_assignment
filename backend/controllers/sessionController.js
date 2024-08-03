import sessionModel from "../models/sessionModel.js";

const getUserSessions = async (req, res) => {
  try {
    const userSessions = await sessionModel.find(req.body.userId);
    res.status(200).json({ success: true, userSessions });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "unable to get user sessions" });
  }
};

export { getUserSessions };
