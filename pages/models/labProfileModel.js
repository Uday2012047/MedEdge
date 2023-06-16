import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.labprofiles || mongoose.model("labprofiles", profileSchema);
export default Dataset;
