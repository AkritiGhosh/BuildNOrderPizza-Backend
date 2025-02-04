import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    apartment: { type: String, required: true },
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    lastUsed: { type: Boolean, required: true },
  },
  {
    collection: db.user.address.collection,
    timestamps: true,
  }
);

const addressModel = mongoose.model("UserAddress", addressSchema);
