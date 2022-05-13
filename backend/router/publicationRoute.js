import express from 'express';
import * as publication from '../controller/publicationController.js'
import { upload } from '../config/upload.js';


const publicationRoute = express.Router();

publicationRoute.get('/publication/getAllPublication', publication.showPublication);
publicationRoute.post('/publication/createPublication', upload.array('upload', 3), publication.createPublication);




export default publicationRoute