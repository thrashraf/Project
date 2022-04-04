import express from 'express';
import * as inno from '../controller/innoController.js'


const innoRoute = express.Router();

innoRoute.get('/inno/getAllInno', inno.showInno);



export default innoRoute