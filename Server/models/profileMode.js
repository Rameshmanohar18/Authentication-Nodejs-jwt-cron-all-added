import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    }
  },
  {
    strict: false,
    timestamps: true
  }
);

export default mongoose.model("Profile", profileSchema);
