import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  name:{type: String, required: true},
  doctor_id: { type: String, required: true },
  patient_id: { type: String, required: true },
  rating: { type: Number, required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
   },
  description : { type: String, required: true}

});

const rating =
  mongoose.models.rating ||
  mongoose.model("rating", ratingSchema);
export default rating;
