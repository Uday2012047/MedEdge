import Users from "../models/patientUserModel";
import Patientprofiles from "../models/patientProfileModel";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const body = req.body;
  const userExists = await Users.findOne({ email: body.email });
  if (userExists) {
    res.status(200).json({ message: "Already registered" });
    return;
  }
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashpass = await bcrypt.hash(body.password, salt);
  const user = new Users({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    password: hashpass,
  });
  const profile = new Patientprofiles({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    address: "",
    pincode: 0,
    profilephoto: "",
    age: 0,
    bloodgroup: "",
  });
  await user.save();
  await profile.save();
  res.status(200).json({ message: "Registered successfully" });
}
