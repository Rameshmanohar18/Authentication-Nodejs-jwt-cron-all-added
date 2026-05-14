import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const publicUserFields = "-password";

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select(publicUserFields);
  res.json({ success: true, data: users });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select(publicUserFields);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req, res) => {
  const allowedUpdates = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar
  };

  Object.keys(allowedUpdates).forEach((key) => {
    if (allowedUpdates[key] === undefined) delete allowedUpdates[key];
  });

  const user = await User.findByIdAndUpdate(req.params.id, allowedUpdates, {
    new: true,
    runValidators: true
  }).select(publicUserFields);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User deleted" });
});

export const block = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { blocked: true },
    { new: true }
  ).select(publicUserFields);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User blocked", data: user });
});

export const unblock = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { blocked: false },
    { new: true }
  ).select(publicUserFields);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "User unblocked", data: user });
});

export const search = asyncHandler(async (req, res) => {
  const users = await User.find({
    name: new RegExp(req.params.q, "i")
  }).select(publicUserFields);

  res.json({ success: true, data: users });
});

export const activeUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ blocked: false }).select(publicUserFields);
  res.json({ success: true, data: users });
});

export const inactiveUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ blocked: true }).select(publicUserFields);
  res.json({ success: true, data: users });
});

export const stats = asyncHandler(async (req, res) => {
  const [total, active, inactive] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ blocked: false }),
    User.countDocuments({ blocked: true })
  ]);

  res.json({ success: true, data: { total, active, inactive } });
});

export const recent = asyncHandler(async (req, res) => {
  const users = await User.find().select(publicUserFields).sort({ createdAt: -1 }).limit(5);
  res.json({ success: true, data: users });
});

export const changeRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.id,
    { role: req.body.role },
    { new: true, runValidators: true }
  ).select(publicUserFields);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, message: "Role updated", data: user });
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: req.body.avatar || "" },
    { new: true }
  ).select(publicUserFields);

  res.json({ success: true, message: "Avatar updated", data: user });
});

export const removeAvatar = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: "" },
    { new: true }
  ).select(publicUserFields);

  res.json({ success: true, message: "Avatar removed", data: user });
});
