import express from "express";
import { getUserSessions } from "../controllers/sessionController.js";
import authMiddleware from "../middlewares/auth.js";

const sessionRouter = express.Router();

sessionRouter.get("/sessions", authMiddleware, getUserSessions);

export default sessionRouter;
