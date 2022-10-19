import express from 'express';
import adminsRouter from './admins';
import employeeRoutes from './employees';

const router = express.Router();

router.use('/admins', adminsRouter);
router.use('/employees', employeeRoutes);

export default router;
