import express from 'express';
import { upload } from '../config/upload.js';
import * as admin from '../controller/adminController.js';
import { verifytoken } from '../middleware/verifytoken.js';

const adminRoute = express.Router();

adminRoute.post('/admin/updateUser', upload.single('upload'), admin.updateUser);
adminRoute.post('/admin/updateUserWithPassword', admin.updateUserWithPassword);
adminRoute.delete('/admin/deleteUser', admin.deleteUser);
adminRoute.post('/admin/createUser', verifytoken, admin.createUser);

export default adminRoute;
