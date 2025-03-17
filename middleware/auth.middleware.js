import { JWT_SECRET } from "../config/env";
import { throwNewError } from "../lib/core";
import jwt from "jsonwebtoken";
import UserAccount from "../model/user.account.model";

export const authenticatedUse = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authentication ||
      req.headers.authentication.startsWith("Bearer")
    )
      token = req.headers.authentication.split(" ")[1];
    else throwNewError("Unauthorised request", 401);

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserAccount.findById(decoded.userId);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });

    req.user = user;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Unauthorized access", data: error });
  }
};
