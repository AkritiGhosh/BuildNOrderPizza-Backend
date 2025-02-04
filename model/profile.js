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
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    address: [addressSchema],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);

const userProfileModel = mongoose.model("User", userProfileSchema);
