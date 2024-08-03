import express from "express";
import { registration, login, logout } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registration);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
