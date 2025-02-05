import mongoose from "mongoose";

const userAccountSchema = mongoose.Schema(
  {
    phone: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    authMethod: { type: String, enum: ["EMAIL_PWD", "OTP", "GOOGLE"] },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const userAccountModel = mongoose.model("Account", userAccountSchema);
