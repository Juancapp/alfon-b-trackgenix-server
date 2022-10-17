import express from 'express';
import employeesRouter from './employees';

const router = express.Router();

router.use('/employees', employeesRouter);

export default router;
