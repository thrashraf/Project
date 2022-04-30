import express from 'express';
import { upload } from '../config/upload.js';
import * as activities from '../controller/activitiesController.js'


const activitiesRoute = express.Router();

activitiesRoute.get('/activities/getAllActivities', activities.allActivities);
activitiesRoute.post('/activities/createActivities', upload.array('upload', 3), activities.createActivities);

export default activitiesRoute;