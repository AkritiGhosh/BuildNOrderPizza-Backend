import express from "express";

const authRouter = express.Router();

// Register as new user using email and password
authRouter.post('/register')

// Login existing user using email and password
authRouter.post('/login')

// Change password

// Forget password

// Register/Login using Google SSO


export default authRouter;