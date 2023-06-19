import Users from "../models/doctorUserModel";
import Doctorprofiles from "../models/doctorProfileModel";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const body = req.body;
  const userExists = await Users.findOne({ phone: body.phone });
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
  const profile = new Doctorprofiles({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    address: "",
    sex: "",
    pincode: 0,
    profilephoto: "",
    experience: 1,
    doctorid: "",
  });
  await user.save();
  await profile.save();
  res.status(200).json({ message: "Registered successfully" });
}
