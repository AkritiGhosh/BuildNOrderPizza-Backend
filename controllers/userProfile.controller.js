import { throwNewError } from "../lib/core.js";
import UserAccount from "../model/user.account.model.js";
import UserProfile from "../model/user.profile.model.js";

export const createProfile = async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    const { name, gender, dob } = req?.body;
    if (!name) throwNewError("Invalid data", 400);

    const user = await UserAccount.findById(userId)
    if(!user) throwNewError("Invalid user", 404)
    if (user?.profile) throwNewError("Account already exists", 400);

    const newUserProfile = await UserProfile.create({
      account: userId,
      name,
      gender,
      birthDate: dob,
    });

    const account = await UserAccount.findByIdAndUpdate(
      userId,
      { $set: { profile: newUserProfile?._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: { profile: newUserProfile, user: account },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileData = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const addNewAddress = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const editAddress = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
