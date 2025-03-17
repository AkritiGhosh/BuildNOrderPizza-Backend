import express from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Register as new user using email and password
authRouter.post("/register", authController.registerNewUser);

// Login existing user using email and password
authRouter.post("/login", authController.loginUser);

// Change password

// Forget password

// Register/Login using Google SSO

export default authRouter;
