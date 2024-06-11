import express from 'express';
import { contactForm } from '../controllers/contact-controller.js';

export const router2 = express.Router();

router2.post('/form' , contactForm);