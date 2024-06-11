import express from 'express';
import { Contact } from '../models/contact-model.js';

export const contactForm = async (req, res) => {
    try{
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message : "message sent successfully"});
    }catch(e){
        console.log(e);
        return res.status(500).json({message : "something went wrong"});
    }
}