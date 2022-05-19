import express from 'express';
import * as inno from '../controller/innoController.js'
import { upload } from '../config/upload.js';


const innoRoute = express.Router();

innoRoute.get('/inno/getAllInno', inno.showInno);
innoRoute.post('/inno/createInnovation', upload.array('upload', 3), inno.createInnovation);



export default innoRoute