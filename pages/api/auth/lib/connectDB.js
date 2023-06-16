import mongoose from "mongoose";
const connectDB = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    // process.exit();
  }
};
export default connectDB;
// const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017";

// const connectToMongo = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     mongoose.connect(mongoURI);
//     console.log("Mongo connected");
//   } catch (error) {
//     console.log(error);
//     process.exit();
//   }
// };
// module.exports = connectToMongo;
