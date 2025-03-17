import express from "express";
import { authenticatedUse } from "../middleware/auth.middleware.js";
import * as profileController from "../controllers/userProfile.controller.js";

const profileRouter = express.Router();

// Create new user
profileRouter.post("/new", authenticatedUse, profileController.createProfile);

// Get user information
profileRouter.get("/:id", authenticatedUse, profileController.getProfileData);

// Update user information
profileRouter.put("/:id", authenticatedUse, profileController.editProfile);

// Delete user
profileRouter.delete("/:id", authenticatedUse, profileController.deleteProfile);

// Add new address
profileRouter.put(
  "/:id/address/new",
  authenticatedUse,
  profileController.addNewAddress
);

// Edit existing address
profileRouter.put(
  "/:id/address/:addressId",
  authenticatedUse,
  profileController.editAddress
);

// Delete address
profileRouter.delete(
  "/:id/address/:addressId",
  authenticatedUse,
  profileController.deleteAddress
);

export default profileRouter;
