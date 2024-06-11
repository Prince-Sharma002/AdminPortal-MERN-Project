import express from 'express';
import User from '../models/user-model.js'; 
import bcrypt  from 'bcryptjs';

export const home = async( req, res )=>{
    try{
        res
        .status(200)
        .send("home page");
    }
    catch(err){
        res
        .status(500)
        .send(err);
    }
}

export const register = async( req, res )=>{
    try{
        console.log("data is " , req.body);

        
        const  {username , email , phone , password , isAdmin } = req.body;
        const saltValue = 10;
        const hash_password = await bcrypt.hash( password , saltValue );
        const UserExist = await User.findOne({email: email});

        if( UserExist){
            return res
           .status(400)
           .json({message : "user already exist"});
        }

        const UserCreated =   await User.create({username , email , phone , password :  hash_password , isAdmin});
        
        res
        .status(201)
        .json( {message : UserCreated,
             token : await UserCreated.generateToken(),
             userId : UserCreated._id.toString(),
            });
    }
    catch(err){
        res
        .status(500)
        .send(err);
    }
}

export const login = async (req, res) => {
    try{
        const { email ,  password } = req.body;
        const UserExist = await User.findOne({email : email});
        console.log("user is " , UserExist);
        if( !UserExist ){
            return res.status(400).json({message: "invalid credentials"});
        }
        
        const user = await UserExist.comparePassword(password);
        
        if( user){
            res
            .status(200)
            .json( {message : "login successful",
                 token : await UserExist.generateToken(),
                 userId : UserExist._id.toString(),
                });
        }
        else{
            res.status(401).json({message: "invalid credential"});
        }
    }catch(err){
        res
        .status(500)
        .send(err);
    }

}

export const user = async(req, res )=>{
    try{

        const userData = req.user;
        console.log(userData);

       return res
       .status(200)
       .json( { msg : userData } );
    }
    catch(err){
        res
       .status(500)
       .send(err);
    }   
}