import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    bio: {
      type: String,
      trim: true,
      default: ""
    },
    skills: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      trim: true,
      default: ""
    },
    socials: {
      github: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      website: { type: String, trim: true, default: "" }
    },
    image: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
