import express from 'express';
import * as activities from '../controller/activitiesController.js'


const activitiesRoute = express.Router();

activitiesRoute.get('/activities/getAllActivities', activities.allActivities);

export default activitiesRoute