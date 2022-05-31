import express from 'express';
import * as kpi from '../controller/kpiController.js';

const kpiRoute = express.Router();

kpiRoute.get('/kpi/getKpi', kpi.getKpiValue);

export default kpiRoute;
