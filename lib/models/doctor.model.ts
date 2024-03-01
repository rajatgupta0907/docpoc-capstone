import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { String },
  bio: { String },
  phonenumber: { String },
  speciality: { String },
  profileType: {String},
  isVerified:{
    type:Boolean,
    default:false,
  }
});

const doctor = mongoose.models.doctor || mongoose.model("doctor", userSchema);
export default doctor;
