import express from 'express';
import * as users from '../controller/usersController.js';
import { verifytoken } from '../middleware/verifytoken.js';
import { refreshToken } from '../controller/refreshToken.js';
import { upload } from '../config/upload.js';

const usersRoute = express.Router();

usersRoute.post('/user/register', users.registerUser);
usersRoute.post('/user/login', users.loginUser);
usersRoute.get('/user/token', refreshToken);
usersRoute.post('/user/updateInformation', users.updateUserInformation);
usersRoute.get('/user/getAllUser', users.getAllUser);
usersRoute.delete('/user/logout', users.Logout);
usersRoute.delete('/user/delete', verifytoken, users.testDelete);
usersRoute.post('/user/auth', verifytoken, users.authUser);
usersRoute.post(
  '/user/uploadSignature',
  upload.single('upload'),
  users.uploadImage
);
usersRoute.post(
  '/user/uploadProfile',
  upload.single('upload'),
  users.uploadProfilePicture
);
usersRoute.post('/user/updatePassword', verifytoken, users.updatePassword);
usersRoute.get('/user/amountUser', users.getAmountUser);

export default usersRoute;
