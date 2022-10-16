import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidations from '../validations/timesheets';

const router = express.Router();

router
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getAllTimesheetByID)
  .post('/', timesheetsValidations.validateTimeSheets, timesheetsControllers.createTimesheet);

export default router;
