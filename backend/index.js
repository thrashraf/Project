import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
 
dotenv.config();

const port = 5000 || process.env.PORT;

//* import route
import usersRoute from './router/usersRoute.js';
import adminRoute from './router/adminRoute.js';
import innoRoute from './router/innoRoute.js';
import publicationRoute from './router/publicationRoute.js'
import reportRoute from './router/reportRoute.js';

const app = express();

//enable cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', usersRoute, adminRoute, innoRoute, publicationRoute);
app.use('/api', usersRoute, adminRoute, innoRoute, reportRoute);


app.listen(port, console.log(`server running on port ${port}`))