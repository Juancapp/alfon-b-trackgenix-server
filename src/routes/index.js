import express from 'express';
import timesheetsRouter from './timesheets';

const router = express.Router();
router.use('/timesheets', timesheetsRouter);

export default router;
