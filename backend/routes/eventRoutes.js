import express from "express";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/eventController.js";
import authMiddleware from "../middlewares/auth.js";

const eventRouter = express.Router();

eventRouter.post("/events", authMiddleware, addEvent);
eventRouter.get("/events", authMiddleware, getEvents);
eventRouter.put("/events/:id", authMiddleware, updateEvent);
eventRouter.delete("/events/:id", authMiddleware, deleteEvent);

export default eventRouter;
