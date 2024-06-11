import mongoose from "mongoose";


// const URI = "mongodb://127.0.0.1:27017/mern_Database";
const URI = process.env.MONGODB_URI;

const mongodbCon = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("database connection established")
    }catch(err){
        console.log("connection error")
        process.exit();
    }
}

export default mongodbCon;