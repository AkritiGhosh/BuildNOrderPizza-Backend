import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { throwNewError } from "../lib/core.js";
import UserAccount from "../model/user.account.model.js";

export const authenticatedUse = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization ||
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    else throwNewError("Unauthorised request", 401);

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserAccount.findById(decoded._id);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });

    req.user = user;
    next();
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unauthorized access to the request",
      data: error,
    });
  }
};
