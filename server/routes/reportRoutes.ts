import express from 'express';
const router = express.Router();

import {getReports, createReport} from '../controllers/reportController'
import { isAuthenticated } from '../middleware/authMiddleware';

router.route('/')
    .get(getReports)
    .post(isAuthenticated, createReport)

router
    .route('/:id')

module.exports = router;