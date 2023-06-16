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
    dob: {
      type: Date,
    },
    doctorid: {
      type: String,
    },
    currentworkplace: {
      type: String,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.doctorprofiles ||
  mongoose.model("doctorprofiles", profileSchema);
export default Dataset;
