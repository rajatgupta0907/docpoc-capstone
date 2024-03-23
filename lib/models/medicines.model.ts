import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    patientid: {type:String, required:true},
    doctorid: {type:String, required:true},
    patientname: {type:String, required:true},
    uniqueappointmentid : {type:String},
    typeofdisease: {type: String, required: true},
    description: {type: String, required: true},
    medicines : [
        {
           medicinename : String,
           medicinetype: String,
           medicineqty: Number 
        }
    ],
});

const user= mongoose.models.Medicines || mongoose.model('Medicines',userSchema);
export default user;