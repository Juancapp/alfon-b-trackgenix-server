import express from 'express';
import tasksRouter from './tasks';
import projectsRouter from './projects';
import superAdminsRouter from './super-admins';
import adminsRouter from './admins';
import employeeRoutes from './employees';
import timesheetsRouter from './timesheets';

const router = express.Router();
router.use('/timesheets', timesheetsRouter);
router.use('/tasks', tasksRouter);
router.use('/projects', projectsRouter);
router.use('/super-admins', superAdminsRouter);
router.use('/admins', adminsRouter);
router.use('/employees', employeeRoutes);
router.use('/timesheets', timesheetsRouter);

export default router;
