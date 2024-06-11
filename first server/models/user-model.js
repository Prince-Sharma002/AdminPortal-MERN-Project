import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt  from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
});


userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}


userSchema.methods.generateToken =  async function (){

    try{

        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin,
        },
        process.env.JWT_KEY,
        {
            expiresIn : "30d",
        }
        
    )

    }catch(err){
        console.error(err)
    }

}


const User = new mongoose.model( "User" , userSchema);
export default User;
