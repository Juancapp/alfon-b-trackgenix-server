import express from 'express';
import timesheetsControllers from '../controllers/timesheets';
import timesheetsValidations from '../validations/timesheets';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router
  .get('/', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), timesheetsControllers.getAllTimesheets)
  .get('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), timesheetsControllers.getTimesheetByID)
  .post(
    '/',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    timesheetsValidations.validateTimeSheets,
    timesheetsControllers.createTimesheet,
  )
  .put(
    '/:id',
    checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']),
    timesheetsValidations.validateTimeSheets,
    timesheetsControllers.updateTimesheets,
  )
  .delete('/:id', checkAuth(['SUPER_ADMIN', 'ADMIN', 'EMPLOYEE']), timesheetsControllers.deleteTimesheets);

export default router;
