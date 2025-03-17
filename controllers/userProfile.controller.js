import { throwNewError } from "../lib/core.js";
import UserAccount from "../model/user.account.model.js";
import UserProfile from "../model/user.profile.model.js";

export const createProfile = async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    const { name, gender, birthDate } = req?.body;
    if (!name) throwNewError("Invalid data", 400);

    const user = await UserAccount.findById(userId);
    if (!user) throwNewError("Invalid user", 404);
    if (user?.profile) throwNewError("Account already exists", 400);

    const newUserProfile = await UserProfile.create({
      account: userId,
      name,
      gender,
      birthDate,
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
    const id = req.user.profile;
    if (!id) throwNewError("Profile doesn't exist", 404);

    let profile = await UserProfile.findById(id);
    if (!profile) throwNewError("Profile doesn't exist", 404);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (req, res, next) => {
  try {
    const id = req.user.profile;
    if (!id) throwNewError("Profile doesn't exist", 404);

    let profile = await UserProfile.findById(id);
    if (!profile) throwNewError("Profile doesn't exist", 404);

    const updatedData = await UserProfile.findByIdAndUpdate(
      id,
      { $set: req?.body },
      { new: true, runValidators: true }
    );

    if (!updatedData) throwNewError("Unable to update value", 400);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedData,
    });
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
    const id = req.user.profile;
    if (!id) throwNewError("Profile doesn't exist", 404);

    let profile = await UserProfile.findById(id);
    if (!profile) throwNewError("Profile doesn't exist", 404);

    const profileData = await UserProfile.findById(id);
    let addressList = profileData.address;

    addressList = [...addressList, req.body.data];
    const updatedData = await UserProfile.findByIdAndUpdate(
      id,
      { $set: { address: addressList } },
      { new: true, runValidators: true }
    );

    if (!updatedData) throwNewError("Unable to update value", 400);

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      data: updatedData,
    });

    next();
    return;
  } catch (error) {
    next(error);
  }
};

export const editAddress = async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const newData = req.body.data;
    const id = req.user.profile;
    if (!id) throwNewError("Profile doesn't exist", 404);

    let profile = await UserProfile.findById(id);
    if (!profile) throwNewError("Profile doesn't exist", 404);

    const profileData = await UserProfile.findById(id);
    let addressList = profileData.address;

    const updatedList = addressList.map((address) => {
      if (address?._id == addressId) return newData;
      else address;
    });

    const updatedData = await UserProfile.findByIdAndUpdate(
      id,
      { $set: { address: updatedList } },
      { new: true, runValidators: true }
    );

    if (!updatedData) throwNewError("Unable to update value", 400);

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const addressId = req.params.addressId;
    const id = req.user.profile;
    if (!id) throwNewError("Profile doesn't exist", 404);

    let profile = await UserProfile.findById(id);
    if (!profile) throwNewError("Profile doesn't exist", 404);

    const profileData = await UserProfile.findById(id);
    let addressList = profileData.address;

    const updatedList = addressList.filter(
      (address) => String(address?._id) != addressId
    );
    
    const updatedData = await UserProfile.findByIdAndUpdate(
      id,
      { $set: { address: updatedList } },
      { new: true, runValidators: true }
    );

    if (!updatedData) throwNewError("Unable to update value", 400);

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};
