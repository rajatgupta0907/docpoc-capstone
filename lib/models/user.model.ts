import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type:String, required:true},
    username: {type:String, required:true, unique: true},
    name:{type:String,required:true},
    image:{String},
    bio:{String},
    phonenumber:{String},

    onBoarded:{
        type:Boolean,
        default:false,
    },
    



});

const user= mongoose.models.User || mongoose.model('User',userSchema);
export default user;