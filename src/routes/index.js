import express from 'express';
import superAdminsRouter from './super-admins';
import adminsRouter from './admins';
import employeeRoutes from './employees';
import timesheetsRouter from './timesheets';

const router = express.Router();

router.use('/super-admins', superAdminsRouter);
router.use('/admins', adminsRouter);
router.use('/employees', employeeRoutes);
router.use('/timesheets', timesheetsRouter);

export default router;
