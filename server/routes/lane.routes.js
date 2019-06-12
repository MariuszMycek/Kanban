import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';

const router = new Router();

// Add new Lane
router.route('/lanes').post(LaneController.addLane);

export default router;
