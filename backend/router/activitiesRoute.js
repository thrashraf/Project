import express from 'express';
import { upload } from '../config/upload.js';
import * as activities from '../controller/activitiesController.js';
import { verifytoken } from '../middleware/verifytoken.js';

const activitiesRoute = express.Router();

activitiesRoute.get(
  '/activities/getAllActivities',

  activities.allActivities
);
activitiesRoute.post(
  '/activities/createActivities',
  upload.array('upload', 3),
  activities.createActivities
);
activitiesRoute.delete(
  '/activities/deleteActivities',
  activities.deleteActivities
);
activitiesRoute.post(
  '/activities/updateActivities',
  upload.array('upload', 3),
  activities.updateActivities
);
activitiesRoute.post(
  '/activities/createReport',
  upload.array('upload', 10),
  activities.createReport
);
activitiesRoute.get(
  '/activities/getActivitiesById',
  activities.getActivitiesById
);
activitiesRoute.post('/activities/verifyReport', activities.verifyReport);

export default activitiesRoute;
