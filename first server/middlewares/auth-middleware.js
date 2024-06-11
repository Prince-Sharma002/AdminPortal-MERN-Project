import jwt from "jsonwebtoken";
import 'dotenv/config';
import User from "../models/user-model.js"

export const authMiddleware = async (req, res , next)=>{
    const token = req.header('Authorization');

    if( !token){
        return res.status(401).json({message : "Unauthorized HTTP, Token is not provided."});
    }

    const jwttoken = token.replace("Bearer" , "").trim();

    try{
        const decoded = jwt.verify(jwttoken, process.env.JWT_KEY );
        req.user = decoded;
        
        const UserData = await User.findOne({ email: decoded.email}).select({
            password : 0,
        });
        console.log("userdata : " , UserData );

        // coustom properties
        req.user = UserData;
        req.token = token;
        req.id = UserData._id;

        next();
    }catch(e){
        return res.status(401).json({message : "Unauthorized HTTP, Token is not valid."});
    }

}