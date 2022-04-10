import express from 'express';
import { upload } from '../config/upload.js';
import * as report from '../controller/reportController.js';

const reportRoute = express.Router();

reportRoute.post('/report/createReport', upload.array('upload', 10), report.createReport);
reportRoute.get('/report/getAllReport',  );

export default reportRoute;