import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidation from '../validations/timesheets';

const router = express.Router();

router
  .delete('/:id', timesheetsControllers.deleteTimesheets)
  .put('/:id', timesheetsValidation.validateTimesheets, timesheetsControllers.editTimesheets);

export default router;
