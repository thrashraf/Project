import express from 'express';
import * as publication from '../controller/publicationController.js'


const publicationRoute = express.Router();

publicationRoute.get('/publication/getAllPublication', publication.showPublication);



export default publicationRoute