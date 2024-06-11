import  express, { Router } from 'express';
import {home, register , login, user} from "../controllers/auth-controller.js"
import { SignupSchema , loginSchema } from '../validators/auth-validator.js';
import { validate } from '../middlewares/validate-middleware.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

export const router1 = express.Router();

router1.get('/' , 
    home
)

router1.post('/register' , 
    validate(SignupSchema), // first validate the schema 
    register
)

router1.post('/login' , 
    validate(loginSchema),
    login
)

router1.get('/user' ,
    authMiddleware , 
    user 
)

