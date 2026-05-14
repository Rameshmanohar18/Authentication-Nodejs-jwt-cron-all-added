import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ")[1];

    if (!bearerToken) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.blocked) {
      return res.status(403).json({ success: false, message: "User is blocked" });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email
    };

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Invalid or expired token";
    next(error);
  }
};

export default authMiddleware;
