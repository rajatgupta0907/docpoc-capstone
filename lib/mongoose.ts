import mongoose from 'mongoose';
let isConnected=false;

export const connectToDb= async () => {
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URL) return console.log("mongo db url not found");

    if(isConnected) return console.log("Already Connected to Mongodb");

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("connect to mongodb");

    }catch(error){
        console.log(error);

    }
}