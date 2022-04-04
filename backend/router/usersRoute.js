import express from 'express';
import * as users from '../controller/usersController.js';
import { verifytoken } from '../middleware/verifytoken.js';
import { refreshToken } from '../controller/refreshToken.js';


const usersRoute = express.Router();

usersRoute.post('/user/register', users.registerUser);
usersRoute.post('/user/login', users.loginUser );
usersRoute.get('/user/token', refreshToken);
usersRoute.get('/user/getAllUser', verifytoken, users.getAllUser); 
usersRoute.delete('/user/logout', users.Logout);


export default usersRoute