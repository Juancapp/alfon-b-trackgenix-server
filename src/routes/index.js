import express from 'express';
import superAdminsRouter from './super-admins';

const router = express.Router();

router.use('/super-admins', superAdminsRouter);

export default router;
