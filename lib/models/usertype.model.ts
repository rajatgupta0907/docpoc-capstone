import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type:String, required:true},
   
    onBoarded:{
        type:Boolean,
        default:false,
    },
    profileType: {String},

    

});

const UserType= mongoose.models.User || mongoose.model('User',userSchema);
export default UserType;