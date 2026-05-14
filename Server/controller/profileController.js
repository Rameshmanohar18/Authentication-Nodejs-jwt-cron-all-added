import Profile from "../models/profileModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const create = asyncHandler(async (req, res) => {
  const existingProfile = await Profile.findOne({ userId: req.user.id });

  if (existingProfile) {
    return res.status(409).json({ success: false, message: "Profile already exists" });
  }

  const profile = await Profile.create({
    userId: req.user.id,
    bio: req.body.bio,
    skills: req.body.skills,
    location: req.body.location,
    socials: req.body.socials,
    image: req.body.image
  });

  res.status(201).json({ success: true, data: profile });
});

export const get = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  res.json({ success: true, data: profile });
});

export const update = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { new: true, runValidators: true, upsert: true }
  );

  res.json({ success: true, data: profile });
});

export const remove = asyncHandler(async (req, res) => {
  await Profile.deleteOne({ userId: req.user.id });
  res.json({ success: true, message: "Profile deleted" });
});

export const skills = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    { skills: req.body.skills || [] },
    { new: true, runValidators: true, upsert: true }
  );

  res.json({ success: true, message: "Skills updated", data: profile });
});

export const location = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    { location: req.body.location || "" },
    { new: true, runValidators: true, upsert: true }
  );

  res.json({ success: true, message: "Location updated", data: profile });
});

export const socials = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    { socials: req.body.socials || {} },
    { new: true, runValidators: true, upsert: true }
  );

  res.json({ success: true, message: "Social links updated", data: profile });
});

export const uploadImage = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    { image: req.body.image || "" },
    { new: true, runValidators: true, upsert: true }
  );

  res.json({ success: true, message: "Image updated", data: profile });
});

export const deleteImage = asyncHandler(async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    { image: "" },
    { new: true, runValidators: true, upsert: true }
  );

  res.json({ success: true, message: "Image deleted", data: profile });
});

export const getByUser = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ userId: req.params.userId });

  if (!profile) {
    return res.status(404).json({ success: false, message: "Profile not found" });
  }

  res.json({ success: true, data: profile });
});
