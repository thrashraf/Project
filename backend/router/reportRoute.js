import express from 'express';
import { upload } from '../config/upload.js';
import * as report from '../controller/reportController.js';

const reportRoute = express.Router();

reportRoute.post('/report/uploadPhoto', upload.array('upload', 10), report.uploadPhoto);

export default reportRoute;