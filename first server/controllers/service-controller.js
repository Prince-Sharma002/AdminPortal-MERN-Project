import express from 'express';
import { Service } from '../models/service-model.js';

export const Services = async (req, res) => {
    try{
        const response = await Service.find();
        if( !response ){
            res.status(404).json({message:"No service found" });
            return ;
        }

        res.status(200).json({ msg : response });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message : "something went wrong"});
    }
}