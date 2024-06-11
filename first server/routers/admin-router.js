import { getAllUsers , getAllContacts, deleteUserById , getUserById, updateUserById, deleteContactById} from "../controllers/admin-controller.js";
import express from 'express';
import { authMiddleware } from "../middlewares/auth-middleware.js";
import {adminMiddleware} from "../middlewares/admin-middleware.js";


export const router4 = express.Router();

router4.get('/users' ,authMiddleware , adminMiddleware ,  getAllUsers);
router4.delete('/users/delete/:id' , authMiddleware , adminMiddleware , deleteUserById );
router4.get('/users/:id' , authMiddleware , adminMiddleware , getUserById );
router4.patch('/users/update/:id' , authMiddleware , adminMiddleware , updateUserById );
router4.get('/contacts' ,authMiddleware  ,  getAllContacts);
router4.delete('/contacts/delete/:id' ,authMiddleware , adminMiddleware ,  deleteContactById);
