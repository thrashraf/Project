import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import checkDate from './checkDate.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const port = 5000 || process.env.PORT;

//* import route
import usersRoute from './router/usersRoute.js';
import adminRoute from './router/adminRoute.js';
import innoRoute from './router/innoRoute.js';
import publicationRoute from './router/publicationRoute.js';
import activitiesRoute from './router/activitiesRoute.js';
import kpiRoute from './router/kpiRoute.js';

const app = express();
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

//enable cors
//allow OPTIONS on all resources
app.use(cors({ credentials: true, origin: 'http://sams-jtmk.com' }));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  '/api',
  usersRoute,
  adminRoute,
  innoRoute,
  publicationRoute,
  activitiesRoute,
  kpiRoute
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, '../frontend/build'));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/build/', 'index.html'));
});

checkDate();
app.listen(port, console.log(`server running on port ${port}`));
