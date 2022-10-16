import express from 'express';
import adminsRouter from './admins';

const router = express.Router();

router.use('/admins', adminsRouter);

export default router;
