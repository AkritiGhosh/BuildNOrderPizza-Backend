import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
  apartment: { type: String, required: true },
  street: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  lastUsed: { type: Boolean, required: true },
});

const userProfileSchema = mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    name: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"] },
    birthDate: Date,
    address: [addressSchema],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("User", userProfileSchema);
export default UserProfile;
