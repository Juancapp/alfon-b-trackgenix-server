import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidations from '../validations/timesheets';

const router = express.Router();

router
  .get('/', timesheetsControllers.getAllTimesheets)
  .get('/:id', timesheetsControllers.getTimesheetByID)
  .post('/', timesheetsValidations.validateTimeSheets, timesheetsControllers.createTimesheet)
  .put('/:id', timesheetsValidations.validateTimeSheets, timesheetsControllers.updateTimesheets)
  .delete('/:id', timesheetsControllers.deleteTimesheets);

export default router;
