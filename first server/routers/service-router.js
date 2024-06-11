import express from 'express';
import { Services } from '../controllers/service-controller.js';


export const router3 = express.Router();

router3.get('/service' , Services);