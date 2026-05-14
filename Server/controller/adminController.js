import User from "../models/userModel.js";
import Session from "../models/sessionModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const dashboard = asyncHandler(async (req, res) => {
  const [users, activeUsers, blockedUsers, sessions] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ blocked: false }),
    User.countDocuments({ blocked: true }),
    Session.countDocuments({ revokedAt: null, expiresAt: { $gt: new Date() } })
  ]);

  res.json({
    success: true,
    data: { users, activeUsers, blockedUsers, sessions }
  });
});

export const promote = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.id,
    { role: "admin" },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "Promoted", data: user });
});

export const demote = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.id,
    { role: "user" },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "Demoted", data: user });
});

export const stats = asyncHandler(async (req, res) => {
  const [total, admins, blocked] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "admin" }),
    User.countDocuments({ blocked: true })
  ]);

  res.json({ success: true, data: { total, admins, blocked } });
});

export const sessions = asyncHandler(async (req, res) => {
  const data = await Session.find()
    .populate("userId", "name email role")
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ success: true, data });
});

export const logs = asyncHandler(async (req, res) => {
  res.json({ success: true, data: [] });
});

export const health = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { status: "OK", uptime: process.uptime() } });
});

export const userCount = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { count: await User.countDocuments() } });
});

export const revenue = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { revenue: 0 } });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  await Session.updateMany({ userId: req.params.id }, { revokedAt: new Date() });

  res.json({ success: true, message: "User deleted" });
});
