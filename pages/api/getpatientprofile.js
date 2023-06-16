import Patientprofile from "../models/patientProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function getUser(req, res) {
  try {
    await connectDB();
    const profile = await Patientprofile.findOne({
      email: req.query.email,
    })
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "error sending" });
  }
}
