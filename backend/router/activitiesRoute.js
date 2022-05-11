import express from 'express';
import { upload } from '../config/upload.js';
import * as activities from '../controller/activitiesController.js'


const activitiesRoute = express.Router();

activitiesRoute.get('/activities/getAllActivities', activities.allActivities);
activitiesRoute.post('/activities/createActivities', upload.array('upload', 3), activities.createActivities);
activitiesRoute.delete('/activities/deleteActivities', activities.deleteActivities);
activitiesRoute.post('/activities/updateActivities', upload.array('upload', 3), activities.updateActivities);
activitiesRoute.get('/activities/getActivitiesById', activities.getActivitiesById);

export default activitiesRoute;