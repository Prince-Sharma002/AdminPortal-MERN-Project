import User from "../models/user-model.js";
import {Contact}  from "../models/contact-model.js";

export const getAllUsers = async (req , res)=>{
    try{
        const users = await User.find({} , {password : 0});
        console.log(users);
        if(  !users  || users.length === 0 ){
            res.status(404).json({message : "User not found"});
        }
        return res.status(200).json(users);

    }catch(err){
        next(err);
    }
}


export const deleteUserById = async (req,res) => {
    try{
        const id = req.params.id;
        await User.deleteOne({_id : id});
        return res.status(200).json({msg : "user deleted successfuly"} )
    }
    catch(err){
        next(err)
    }
}


export const getUserById = async (req,res) => {
    try{
        const id = req.params.id;
        console.log("id is " , id);
        const data = await User.findOne({_id:id} , {password: 0});
        return res.status(200).json(data);
    }
    catch(err){
        console.log(err)
    }
}


export const updateUserById = async (req,res) => {
    try{
        const id = req.params.id;
        console.log("body is " ,req.body);
        const updateUser = req.body;

        const updateData = await User.updateOne( { _id : id} ,
            {
                $set : updateUser,            }
         )

         return res.status(200).json(updateData);
    }
    catch(err){
        console.log(err)
    }
}


export const getAllContacts = async (req , res)=>{
    try{
        const contacts = await Contact.find({});
        console.log(contacts);
        if(  !contacts  || contacts.length === 0 ){
            res.status(404).json({message : "contacts not found"});
        }
        return res.status(200).json(contacts);

    }catch(err){
        next(err);
    }
}


export const deleteContactById = async (req,res) => {
    try{
        const id = req.params.id;
        await Contact.deleteOne({_id : id});
        return res.status(200).json({msg : "contact deleted successfuly"} )
    }
    catch(err){
        next(err);
    }
}
