import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  doctor_id : {
    type: String
  },
  urls : [
    {
       url : String
    }
  ]
});

const verification =
  mongoose.models.verification ||
  mongoose.model("verification", verificationSchema);
export default verification;
