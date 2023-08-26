import express from 'express';
const router = express.Router();

import {getNotifications, postNotification, clearNotifications} from '../controllers/notificationController'
import { isAuthenticated } from '../middleware/authMiddleware';

router.route('/').get(getNotifications).post(isAuthenticated, postNotification);
router.route('/clear').post(isAuthenticated, clearNotifications)

module.exports = router;