import express from 'express';
import * as admin from '../controller/adminController.js';
import { verifytoken } from '../middleware/verifytoken.js';

const adminRoute = express.Router();

adminRoute.post('/admin/updateUser', admin.updateUser);
adminRoute.post('/admin/updateUserWithPassword', admin.updateUserWithPassword);
adminRoute.post('/admin/deleteUser', admin.deleteUser);

export default adminRoute;