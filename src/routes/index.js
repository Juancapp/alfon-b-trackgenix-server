import express from 'express';
import projectRouter from './projects';

const router = express.Router();

router.use('/projects', projectRouter);

export default router;
