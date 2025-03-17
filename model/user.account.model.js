import { model, Schema } from "mongoose";

const UserAccountSchema = Schema(
  {
    phone: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    authMethod: { type: String, enum: ["EMAIL_PWD", "OTP", "GOOGLE"] },
    profile: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const UserAccount = model("Account", UserAccountSchema);

export default UserAccount;
