import Doctorprofile from "../models/doctorProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function handler(req, res) {
  try {
    await connectDB();
    const body = req.body;
    const profile = await Doctorprofile.findOneAndUpdate(
      {
        email: body.email,
      },
      { address: body.address, pincode: body.pincode, age: body.age, bloodgroup: body.bloodgroup, gender: body.gender }
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "error" });
  }
}