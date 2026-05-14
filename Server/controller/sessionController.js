import Session from "../models/sessionModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: sessions });
});

export const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { revokedAt: new Date() },
    { new: true }
  );

  if (!session) {
    return res.status(404).json({ success: false, message: "Session not found" });
  }

  res.json({ success: true, message: "Session removed" });
});

export const deleteAll = asyncHandler(async (req, res) => {
  await Session.updateMany(
    { userId: req.user.id, revokedAt: null },
    { revokedAt: new Date() }
  );

  res.json({ success: true, message: "All sessions removed" });
});

export const active = asyncHandler(async (req, res) => {
  const sessions = await Session.find({
    userId: req.user.id,
    revokedAt: null,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });

  res.json({ success: true, data: sessions });
});

export const history = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: sessions });
});

export const device = asyncHandler(async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id })
    .select("userAgent ip createdAt expiresAt revokedAt")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: sessions });
});

export const extend = asyncHandler(async (req, res) => {
  const session = await Session.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id, revokedAt: null },
    { expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { new: true }
  );

  if (!session) {
    return res.status(404).json({ success: false, message: "Session not found" });
  }

  res.json({ success: true, message: "Session extended", data: session });
});

export const count = asyncHandler(async (req, res) => {
  const total = await Session.countDocuments({ userId: req.user.id });
  const activeCount = await Session.countDocuments({
    userId: req.user.id,
    revokedAt: null,
    expiresAt: { $gt: new Date() }
  });

  res.json({ success: true, data: { total, active: activeCount } });
});

export const invalidate = asyncHandler(async (req, res) => {
  const session = await Session.findOneAndUpdate(
    { _id: req.body.id, userId: req.user.id },
    { revokedAt: new Date() },
    { new: true }
  );

  if (!session) {
    return res.status(404).json({ success: false, message: "Session not found" });
  }

  res.json({ success: true, message: "Session invalidated" });
});

export const create = asyncHandler(async (req, res) => {
  res.status(400).json({
    success: false,
    message: "Create sessions through login so refresh tokens stay secure"
  });
});
