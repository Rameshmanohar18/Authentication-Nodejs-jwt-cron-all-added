import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import token from "../Utils/Token.js";
import asyncHandler from "../middleware/asyncHandler.js";

const refreshExpiryDate = () => {
  const days = Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 7);
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};

const sendTokens = async (user, req, res, statusCode = 200) => {
  const accessToken = token.access(user);
  const refreshToken = token.refresh(user);

  await Session.create({
    userId: user._id,
    refreshToken,
    userAgent: req.headers["user-agent"] || "",
    ip: req.ip || "",
    expiresAt: refreshExpiryDate()
  });

  res.status(statusCode).json({
    success: true,
    access: accessToken,
    refresh: refreshToken
  });
};

export const register = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(409).json({ success: false, message: "Email already exists" });
  }

  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });

  await sendTokens(user, req, res, 201);
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid email or password" });
  }

  if (user.blocked) {
    return res.status(403).json({ success: false, message: "Your account is blocked" });
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return res.status(400).json({ success: false, message: "Invalid email or password" });
  }

  await sendTokens(user, req, res);
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshTokenValue = req.body.refreshToken;

  if (!refreshTokenValue) {
    return res.status(400).json({ success: false, message: "Refresh token is required" });
  }

  const decoded = token.verifyRefresh(refreshTokenValue);
  const session = await Session.findOne({
    userId: decoded.id,
    refreshToken: refreshTokenValue,
    revokedAt: null,
    expiresAt: { $gt: new Date() }
  });

  if (!session) {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }

  const user = await User.findById(decoded.id);

  if (!user || user.blocked) {
    return res.status(401).json({ success: false, message: "User not allowed" });
  }

  res.json({
    success: true,
    access: token.access(user)
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshTokenValue = req.body.refreshToken;

  if (refreshTokenValue) {
    await Session.findOneAndUpdate(
      { userId: req.user.id, refreshToken: refreshTokenValue },
      { revokedAt: new Date() }
    );
  }

  res.json({ success: true, message: "Logged out" });
});

export const logoutAll = asyncHandler(async (req, res) => {
  await Session.updateMany(
    { userId: req.user.id, revokedAt: null },
    { revokedAt: new Date() }
  );

  res.json({ success: true, message: "All sessions removed" });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({ success: true, data: user });
});

export const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();

  res.json({ success: true, message: "Password updated" });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "If the email exists, password reset instructions will be sent"
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Password reset flow is ready for email token integration"
  });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "Email verification flow is ready for email token integration"
  });
});

export const resendVerification = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: "If the email exists, verification instructions will be sent"
  });
});
