import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
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
    profilephoto: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    bloodgroup: {
      type: String,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.patientprofiles ||
  mongoose.model("patientprofiles", profileSchema);
export default Dataset;
