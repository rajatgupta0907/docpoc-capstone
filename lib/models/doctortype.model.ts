import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
 
  isVerified:{
    type:Boolean,
    default:false,
  }
});
const DoctorType = mongoose.models.doctor || mongoose.model("doctor", userSchema);
export default DoctorType;
