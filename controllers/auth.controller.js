import mongoose from "mongoose";
import UserAccount from "../model/user.account.model.js";
import { throwNewError } from "../lib/core.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/env.js";
import UserProfile from "../model/user.profile.model.js";

export const registerNewUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { email, password } = req.body;
    const emailInUse = await UserAccount.findOne({ email });

    if (emailInUse)
      throwNewError("An account with this email already exists", 409);

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = await UserAccount.create({ email, password: hashedPwd });

    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        token: token,
        user: newUser,
      },
    });
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserAccount.findOne({ email });

    if (!user)
      throwNewError(
        "Invalid Email! No account found with this email address",
        404
      );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throwNewError("Incorrect password. Please try again", 400);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    let userResponse = {
      _id: user._id,
      profileId: user.profile,
      email: user.email,
    };

    let profileData = await UserProfile.findById(user.profile);
    if (profileData) userResponse.name = profileData?.name;
    else {
      userResponse.profileId = null;
      userResponse.profile = null;
    }

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token: token,
        user: userResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};
