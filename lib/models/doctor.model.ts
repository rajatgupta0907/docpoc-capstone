import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type:String, required:true},
    username: {type:String, required:true, unique: true},
    name:{type:String,required:true},
    image:{String},
    bio:{String},
    phonenumber:{String},
    isVerified:{Boolean},
    speciality:{String}


});

const doctor= mongoose.models.doctor || mongoose.model('doctor',userSchema);
export default doctor;