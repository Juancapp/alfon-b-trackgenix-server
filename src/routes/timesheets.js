import express from 'express';
import timesheetsControllers from '../controllers/timesheets';

const router = express.Router();

router
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getAllTimesheetByID);

export default router;
