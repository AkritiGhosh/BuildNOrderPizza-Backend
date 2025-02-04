import mongoose from "mongoose";

const userProfileSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    address: { type: mongoose.Schema.Types.ObjectId },
    orderHistory: { type: String, required: true, default: [] },
  },
  {
    collection: db.user.profile.collection,
    timestamps: true,
  }
);

const userProfileModel = mongoose.model("User", userProfileSchema);
